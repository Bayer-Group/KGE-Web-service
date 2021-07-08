import { ITripleStoreConnector } from "./triplestore.connector.interface";
import { NquadsString } from "./models/nquadsString.model";
import { TripleStores, TripleStore } from "../config/configfile.model";
import { DbConfig } from "../routes/models/dbconfig.model";
import {config} from "../config/config";
import axios = require('axios');
import { sparqlAutocompleteIncomingInitial, sparqlAutocompleteIncoming, sparqlAutocompleteIncomingRandom, 
    sparqlAutocompleteOutgoing, sparqlAutocompleteOutgoingAdditional } from "./sparql/autocomplete.sparql";
import cons from "../constants/constants";
import { sparqlCountIncomingLinks, sparqlCountOutgoingLinks } from "./sparql/count.sparql";
import { sparqlIncomingWithFilter, sparqlIncoming, sparqlOutgoing, sparqlRandomPosition, sparqlRandomSubject, 
    sparqlGetSavedData, sparqlPostData, sparqlGetNamedGraphs, sparqlOutgoingVG, sparqlGetVirtualGraphs, sparqlAll, sparqlColid, sparqlGetTripleStores } 
    from "./sparql/graphdata.sparql";
import {createLinkObject, isValue, parseNquads} from "../services/helpers.service";
import {PathResult} from "./models/pathResponse.model";
import { sparqlGlobalPathDescribeNode, sparqlGetPath } from "./sparql/path.sparql";
import logger from '../logger/logger';
import {NQuadsToD3ConverterService} from "../services/nquadsToD3Converter.service";
import { PathConfig } from "../routes/models/pathconfig.model";

class TripleStoreConnector implements ITripleStoreConnector {
    private dbConfig: DbConfig[];
    private tripleStore: TripleStore;
    private httpClient: axios.AxiosInstance;

    constructor(mTripleStore: TripleStore, mConfig: DbConfig[]){
        this.tripleStore = mTripleStore;
        this.dbConfig = mConfig;

        console.log("triplestore.connector dbConfig:")
        console.log(this.dbConfig)

        this.httpClient = axios.default.create({
            baseURL: `${this.tripleStore.protocol}://${this.tripleStore.serviceHost}:${this.tripleStore.port}${this.dbConfig[0].dbpath}`,
            timeout: config().app.dbRequestTimeout,
            headers: {
                'Authorization': this.tripleStore.auth ? this.tripleStore.auth : "",
                'Content-Type': cons.CONTENT_TYPE_SPARQL,
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers' : "Origin, X-Requested-With, Content-Type, Accept,Authorization",
                'Access-Control-Allow-Credentials' : true,
            }
        });
    }

    async getAutocompleteIncomingInitialAsync(query: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlAutocompleteIncomingInitial(query, this.dbConfig));
    }

    async getAutocompleteIncomingAsync(query: string, str: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlAutocompleteIncoming(query, str, this.dbConfig));
    }

    async getAutocompleteIncomingRandomAsync(query: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlAutocompleteIncomingRandom(query, this.dbConfig));
    }

    async getAutocompleteOutgoingAsync(query: string, requestBodyConfig): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlAutocompleteOutgoing(query, requestBodyConfig));
    }

    async getAutocompleteOutgoingAdditionalAsync(query, url, filteredChildURIs): Promise<NquadsString>{
        return this.fetchNquadsAsync(sparqlAutocompleteOutgoingAdditional(query, url, filteredChildURIs, this.dbConfig))
    }

    async getCountIncomingAsync(uri: string): Promise<NquadsString> {
        // console.log(sparqlCountIncomingLinks(uri, this.dbConfig))
        return this.fetchNquadsAsync(sparqlCountIncomingLinks(uri, this.dbConfig));
    }

    async getResourcesIncomingWithFilterAsync(uri: string, filterUri: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlIncomingWithFilter(uri, filterUri, this.dbConfig));
    }

    async getResourcesIncomingAsync(uri: string, dbconfig: DbConfig[]): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlIncoming(uri, dbconfig));
    }

    async getAllAsync(dbconfig: DbConfig[]): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlAll(dbconfig));
    }

    async getColidAsync(uri: string, graph: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlColid(uri,graph));
    }

    async getResourcesOutgoingAsync(uri: string, dbconfig: DbConfig[]): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlOutgoing(uri, dbconfig));
    }
    async getOutgoingAsync(baseNode: string, dbconfig: DbConfig[]): Promise<NquadsString> {       
        
        let res = await this.getResourcesOutgoingAsync(baseNode, dbconfig);
        
        let uriEmptyList = this.getEmptyChildrenUris(res, baseNode) 
    
        const res2 = await this.getResourcesOutgoingVgAsync(uriEmptyList)
        res = res + "" + res2;  
        
        logger.info(res);
        
        if (res) {
            return res;
        } else {
            return null;
        }
        
    }

    async getIncomingAsync(baseNode: string, dbconfig : DbConfig[]): Promise<NquadsString> {
        let res = await this.getResourcesIncomingAsync(baseNode, dbconfig);
        
        let uriEmptyList = this.getEmptyChildrenUris(res, baseNode) 
    
        const res2 = await this.getResourcesOutgoingVgAsync(uriEmptyList)
        res = res + "" + res2;  
        
        if (res) {
            return res;
        } else {
            return null;
        }
        
    }


    async getResourcesOutgoingVgAsync(uriList: string[]): Promise<NquadsString>{
        if (this.dbConfig.every(db => !db.virtualGraphs || db.virtualGraphs.length == 0) ) {
            return ""
        } else {
            return this.fetchNquadsAsync(sparqlOutgoingVG(uriList, this.dbConfig) );
        }
    }

    async getCountOutgoingAsync(uri: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlCountOutgoingLinks(uri, this.dbConfig))
    }

    async getResourcesOutgoingRandomAsync(dbConfig: DbConfig[]): Promise<NquadsString> {
        const randomOffsetNquads = await this.fetchNquadsAsync(sparqlRandomPosition(dbConfig));
        const num = Math.floor(Math.random() * parseInt(parseNquads(randomOffsetNquads)[0].o));
        const randomSubjectNquads = await this.fetchNquadsAsync(sparqlRandomSubject(num, dbConfig));
        const randomSubject = parseNquads(randomSubjectNquads)[0].s;
        return this.fetchNquadsAsync(sparqlOutgoing(randomSubject, dbConfig));

    }

    async getSavedResourcesAsync(id: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlGetSavedData(id));
    }

    async postSavedResourcesAsync(id: string, data: string): Promise<Boolean> {
        return this.postDataAsync(sparqlPostData(id, data));
    }

    async getVirtualGraphsAsync(tripleStores: TripleStores): Promise<NquadsString>{
        return this.fetchNquadsAsync(sparqlGetVirtualGraphs(tripleStores));
    }

    async getNamedGraphsAsync(uri: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlGetNamedGraphs(uri));
    }
    
    async getPathBetweenNodesAsync(pathConfig: any, from: string, to: string): Promise<PathResult> {
        return this.fetchDataWithoutAcceptType(sparqlGetPath(pathConfig, from, to));
    }

    async getTripleStores(): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlGetTripleStores());
    }

    async getPathInNquards(pathconfig: PathConfig, from: string, to: string): Promise<NquadsString> {
        const pathResult = await this.getPathBetweenNodesAsync(pathconfig, from, to);
        if (pathResult) {    
            //  use set to make sure that every node is used only once
            const nodes = new Set<string>();
            let res = pathResult.results.bindings.filter(quad => quad.x && quad.y && quad.p);
            res.map(nquad => {
                nodes.add(nquad.x.value);
                nodes.add(nquad.y.value);
                });
            if (pathconfig.bidirectional) {
                res.forEach(quad => { 
                    if (quad.forward.value === "false") { 
                        let oldX = quad.x;
                        quad.x = quad.y;
                        quad.y = oldX;
                    }
                });
            }
            const links = res.map(nquad => createLinkObject(nquad.p.value, nquad.x.value, nquad.y.value));
            let finalLinks = [];
            // make sure that finalLinks doesnt contain duplicate links
            links.forEach(l => {
                if (!finalLinks.find(foundL => foundL.label === l.label && foundL.source === l.source && foundL.target === l.target)) {
                    if (!isValue(l.source) && !isValue(l.target)) {
                        finalLinks.push(l);
                    }
                }
            })

           const finalNodes = await this.loadNodeData(Array.from(nodes));

           let nquadsResponse = ""
           finalLinks.forEach(l => {
               nquadsResponse += '<' + l.source + '> ' +'<' + l.label + '> ' + '<' + l.target + '> .\n'
           })

           finalNodes.forEach(n => {
            nquadsResponse += n
            })

           return nquadsResponse.toLocaleString();       
        } else return null;
    }
    
    /**
     * Loads additional LoadData for an array of nodes
     * @param nodes array of nodes
     */

    private async loadNodeData(nodes: string[]): Promise<NquadsString[]> {
        let enrichedNodes: NquadsString[] = [];
        const length = nodes.length;
        for (let i=0; i < length; i++) {
            let node = nodes[i];
            let nodeData = await this.describeSingleNodeGlobalPathAsync(node);
            enrichedNodes.push(nodeData);
        }       
        return enrichedNodes;

    }

    async describeSingleNodeGlobalPathAsync(uri: string): Promise<NquadsString> {
        return this.fetchNquadsAsync(sparqlGlobalPathDescribeNode(uri));
    }


    async getClassTableSparql(sparql: string): Promise<NquadsString> {
        try {
            console.log("DB query sent:")
            console.log(sparql)
            const response = await this.httpClient.post('', sparql, {
                baseURL: `${this.tripleStore.protocol}://${this.tripleStore.serviceHost}:${this.tripleStore.port}${this.tripleStore.path}`
            });
            logger.info("Successfully called TripleStore getClassTableSparql");
            return response.data;
          } catch (error) {
            logger.error("Error for method getClassTableSparql");
            logger.error(error);
            // console.log(error)
            return null;
        }
    }

    async fetchClassTable(sparql: string, accept: string): Promise<any> {
        try {
            console.log("DB query sent:")
            console.log(sparql)
            const response = await this.httpClient.post('', sparql, {
                headers: {
                  'Accept': accept,
            }});
            logger.info("Successfully called TripleStore fetchClassTable");
            return response.data;
          } catch (error) {
            logger.error("Error for method fetchClassTable");
            logger.error(error);
            // console.log(error)
            return error;
        }
    }

   /**
    * Calls a TripleStore via HTTP POST and sets the Accept Header to Nquads to always retrieve nquads
    * @param sparql Input SparQL Query
    * @returns An NquadsString (Any Errors will be catched and null will be returned)
    */
    async fetchNquadsAsync(sparql: string): Promise<NquadsString> {
        try {
            console.log("DB query sent fetchNquadsAsync:")
            console.log(sparql)
            const response = await this.httpClient.post('', sparql, {
                headers: {
                  'Accept': cons.ACCEPT_NQUADS,
                  'Authorization': this.tripleStore.auth ? this.tripleStore.auth : "",
                  'Content-Type': cons.CONTENT_TYPE_SPARQL,
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept,Authorization',
                  'Access-Control-Allow-Credentials' : true,
            }});
            logger.info("Successfully called TripleStore fetchNquadsAsync");
            return response.data;
          } catch (error) {
            logger.error("Error for method fetchNquadsAsync");
            logger.error(error);
            // console.log(error)
            return null;
        }
    }

    /**
    * Calls a TripleStore via HTTP POST without an Accept type, to perform update queries
    * Calls the TripleStore with the configured updatePath
    * @param sparql Input SparQL Query
    * @returns true if the data has been pushed successfully
    */
    async postDataAsync(sparql: string): Promise<Boolean> {
        try {
            const response = await this.httpClient.post('', sparql, {
                baseURL: `${this.tripleStore.protocol}://${this.tripleStore.serviceHost}:${this.tripleStore.port}${this.tripleStore.updatePath}`,
                headers: {
                    'Content-Type': cons.CONTENT_TYPE_SPARQL_UPDATE,
                    'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
                }
            });
            logger.info("Successfully called TripleStore postDataAsync");
            return true;
        } catch (error) {
            logger.error("Error for method fetchNquadsAsync postDataAsync");
            logger.error(error);
            return false;
        }
    }
    /**
     * 
     * @param data the nquads from the database
     * @param baseNode 
     */
    private getEmptyChildrenUris(data: NquadsString, baseNode: string){
        let nodes = NQuadsToD3ConverterService.getInstance().convertOutgoing(data as string, baseNode).nodes
        return nodes.filter(node => Object.keys(node.data).length == 1).map(node => node.uri)
    }

/**
* Calls a TripleStore via HTTP POST with an Accept type for sparql json
* @param sparql Input SparQL Query
* @returns true if the data has been pushed successfully
*/
private async fetchDataWithoutAcceptType(sparql: string): Promise<PathResult> {
    try {
        const response = await this.httpClient.post('', sparql, {
            headers: {
                'Accept': cons.ACCEPT_SPARQL_JSON,
                'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
            }
        });
        logger.info("Successfully called TripleStore fetchDataWithoutAcceptType");
        return response.data;
      } catch (error) {
        logger.error("Error for fetchDataWithoutAcceptType");
        logger.error(error);
        return null;
    }
}
}

export default TripleStoreConnector;