import { ClassTableRequest, ClassTableLabelRequest, ClassTableLabelResponse } from "../routes/models/classtable.model";
import { v4 as uuidv4 } from 'uuid';
import TripleStoreConnector from "../connector/triplestore.connector";
import { config } from "../config/config";
import redis from 'redis';
import { promisify } from "util";
import { parseNquads, removeUrlFromString } from "./helpers.service";
import { insertIntoGraph, insertIntoGraphClassSelect } from "../connector/sparql/insertintograph.sparql";
import { DbConfig } from "../routes/models/dbconfig.model";
import cons from "../constants/constants";

export class ClassTableResponse {
    endpoint: string;
}

export class ClassTableStore {
    sparql: string;
    targetDB: DbConfig;
}

export class ClassTableService {


    async getStoredSparqlQuery(uuid: string, accept: string, page?: string, limit?: string): Promise<any> {
        console.log(accept);
        let client;
        if (config().redisConfig.password) {
            client = redis.createClient({ host: config().redisConfig.host, port: config().redisConfig.port, auth_pass: config().redisConfig.password});
        } else {
            client = redis.createClient({ host: config().redisConfig.host, port: config().redisConfig.port});
        }
        const getAsync = promisify(client.get).bind(client);
        let rawStored = await getAsync(uuid);
        let stored: ClassTableStore = JSON.parse(rawStored);
        let sparql = stored.sparql;

        console.log(page, limit)
        if (limit) {
            let nLimit: number = +limit; 
            sparql += ` LIMIT ${nLimit}`;
            console.log(nLimit)
            if (page) {
                let nPage: number = +page; 
                if (nPage > 1) {
                    sparql += ` OFFSET ${(nPage-1)*nLimit}`
                }
            }
        }


        let execRes = await new TripleStoreConnector(config().tripleStores[stored.targetDB.instance], [stored.targetDB]).fetchClassTable(sparql, accept);

        return execRes;
    }

    storeSparqlQuery(tableConfig: ClassTableRequest, host: string): Promise<ClassTableResponse> {
        return this.generateSparqlFromConfig(tableConfig, host);
    }

    private async generateSparqlFromConfig(tableConfig: ClassTableRequest, host: string): Promise<ClassTableResponse> {
        let sparqlSelect = `SELECT `;
        let sparqlWhere = `?uri rdf:type <${tableConfig.classUri}> . `
        tableConfig.attributes.forEach(attr => {
            if (attr.uri == "uri" && attr.display != "uri") {
                sparqlSelect += `(?uri as ?${attr.display}) `;
            } else if (attr.uri == "uri") {
                sparqlSelect += `?uri `;
            } else {
                sparqlSelect += `?${attr.display} `;
                sparqlWhere += ` OPTIONAL { ?uri <${attr.uri}> ?${attr.display} . }`
            }
        });

        
        sparqlWhere = `
        WHERE {
            ${insertIntoGraphClassSelect(sparqlWhere, tableConfig.dbConfig)}
        }
        `;
        
        
        let id = uuidv4();

        let client;
        if (config().redisConfig.password) {
            client = redis.createClient({ host: config().redisConfig.host, port: config().redisConfig.port, auth_pass: config().redisConfig.password});
        } else {
            client = redis.createClient({ host: config().redisConfig.host, port: config().redisConfig.port});
        }
        client.set(id, JSON.stringify({
            sparql: sparqlSelect+sparqlWhere,
            targetDB: tableConfig.dbConfig[0]
        }));
    
        //return sparqlSelect+sparqlWhere;
        return { endpoint: `${host}/classtable/${id}` }
    }

    async fetchLabels(req: ClassTableLabelRequest): Promise<ClassTableLabelResponse> {
        let sparql = `CONSTRUCT { ?s ?p ?o } `
        let sparqlWhere = `?s ?p ?o . `;
        let subjectFilter = `FILTER (?s in (`;
        let result = {};
        req.attributes.forEach((attr, index) => {
            subjectFilter += index === 0 ? `<${attr}>` : `,<${attr}>`;
        });
        subjectFilter += `)) `;

        let predicateFilter = `FILTER (?p in (rdfs:label`;
        req.labels.forEach(label => {
            predicateFilter += `,<${label}>`;
        });
        predicateFilter += `))`;

        sparqlWhere += subjectFilter + predicateFilter;
        sparqlWhere = `
        WHERE {
            ${insertIntoGraph(sparqlWhere, req.dbConfig)}
        }
        `;

        sparql += sparqlWhere;


       // let dbConfig = [{instance:"stardog22",dbpath:"/ontorest/query",searchInDb:true,selectedNamedGraphs:[""],virtualGraphs:[]}];
        let execRes = await new TripleStoreConnector(config().tripleStores[req.dbConfig[0].instance], req.dbConfig).fetchClassTable(sparql, cons.ACCEPT_NQUADS);
        let nquads = parseNquads(execRes);
        
        nquads.forEach(n => {
            if (result[n.s]) {
                result[n.s].push(n.o);
            } else {
                result[n.s] = [n.o];
            }
        });


        req.attributes.forEach((attr) => { 
            if (!result[attr]) {
                result[attr] = [removeUrlFromString(attr)];
            }
        });
        return result;
    }

  
}