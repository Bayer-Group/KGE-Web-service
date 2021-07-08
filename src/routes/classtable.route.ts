import express = require('express');
import logger from '../logger/logger';
import { ClassTableService } from '../services/classtable.service';

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   ClasstableRequest:
 *     type: object
 *     properties:
 *       classUri:
 *         type: string
 *       attributes:
 *         type: array
 
 */

/** 
 * @swagger 
 * /classtable: 
 *   post: 
 *     description: | 
 *       This Endpoints save a given class table configuration and returns a unique identifier that can be used to retrieve the table data
 *     tags: 
 *       - classTable 
 *     produces: 
 *       - application/json 
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Request containing the table configurations
 *         required: true
 *         type: Object
 *     responses: 
 *       200: 
 *         description: OK 
 */

 /**
{
    "classUri": "http://pid.bayer.com/kos/19014/Person",
    "attributes": [
        {
            "uri": "http://10.122.106.18:3000/lastName",
            "display": "lastName"
        },
        {
            "uri": "http://10.122.106.18:3000/firstName",
            "display": "firstName"
        }
    ]
}
  */
router.post('/',  async function(req, res) {
    logger.info("START POST /classtable", req.body);
    let result = await new ClassTableService().storeSparqlQuery(req.body, req.protocol+"://"+req.headers.host);
    logger.info("FINISH POST /classtable", {status: 200});
    res.status(200).json(result);
})

/** 
 * @swagger 
 * /classtable/{uuid}: 
 *   get: 
 *     description: | 
 *       This Endpoints returns ab table structured data by a given id
 *     tags: 
 *       - classTable 
 *     produces: 
 *       - application/json 
 *     parameters:
 *       - in: path
 *         name: uudi
 *         description: Unique identifier of the data
 *         required: true
 *         type: string
 *     responses: 
 *       200: 
 *         description: OK 
 */
 router.get('/:uuid',  async function(req, res) {
    logger.info("START GET /classtable:uuid", req.params.uuid);
    if (req.query.page && !req.query.limit) {
        logger.info("FINISH GET /classtable:uudi", {status: 400});
        res.status(200).json({message: "You need to provide a limit if you want to use paginiation!"});
    } else {
        let result = await new ClassTableService().getStoredSparqlQuery(req.params.uuid, req.headers.accept, req.query.page as string, req.query.limit as string);
        if (result.name == "Error") {
            logger.info("FINISH GET /classtable:uudi", {status: result.response.status});
            res.sendStatus(result.response.status);
        } else {
            res.set("content-type", req.headers.accept);
            if (req.query.page) {
                let page: number = +req.query.page;
                let endpoint = req.protocol+"://"+req.headers.host+"/classtable/"+req.params.uuid;
                logger.info("FINISH GET /classtable:uudi", {status: 200});
                res.status(200).set('Next-Page', `${endpoint}?limit=${req.query.limit}&page=${page+1}`);
                if (page > 1) {
                    res.set('Previous-Page', `${endpoint}?limit=${req.query.limit}&page=${page-1}`);
                }
                res.send(result);
            } else {
                logger.info("FINISH GET /classtable:uudi", {status: 200});
                res.status(200).send(result);
            }
        }

    }
})

/** 
 * @swagger 
 * /classtable/labels: 
 *   post: 
 *     description: | 
 *       This Endpoints retrieves possible lables for the given input attributes and label properties
 *     tags: 
 *       - classTable 
 *     produces: 
 *       - application/json 
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Request containing the label attributes and uris
 *         required: true
 *         type: Object
 *     responses: 
 *       200: 
 *         description: OK 
 */

 /**
{
    "attributes": ["http://pid.bayer.com/kos/19014/worksOn", "http://pid.bayer.com/kos/19014/isLocateIn"],
    "labels": ["http://test.de/hasLabel"]
}
  */
 router.post('/labels',  async function(req, res) {
    logger.info("START POST /classtable", req.body);
    let result = await new ClassTableService().fetchLabels(req.body);
    logger.info("FINISH POST /classtable", {status: 200});
    res.status(200).send(result);
})

export default router;