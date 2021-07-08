import { insertIntoGraph, insertIntoVirtualGraph } from "./insertintograph.sparql";
import {nodedatalinks} from "../../constants/nodedatalinks";
import { DbConfig } from "../../routes/models/dbconfig.model";
import { imageMapping } from "../../constants/image.mapping";
import constants from "../../constants/constants";
import { joinAsValuesList, joinDefaultGraphs } from "../../services/helpers.service";
/**
 * Sparql to retrieve incoming ressources for a given uri 
 * @param uri The baseUri for what the data should be fetched
 * @param filteredUri Additional filterUri to filter the result
 * @param dbconfig database configuration passed form the ui
 */

export const sparqlIncomingWithFilter = (uri, filteredUri, dbconfig) =>  {
  const optional = `OPTIONAL{<${filteredUri}> ?p2 ?o 
      FILTER (!isLITERAL(?o) || LANG(?o) = "" || LANG(?o) = "en")}
    OPTIONAL{?o2 rdf:type <${filteredUri}>} `;
  const queryBody = `
    <${filteredUri}> ?p <${uri}> .
  `;
  return constants.QUERY_PREFIXES+`
  construct {
    <${filteredUri}> ?p <${uri}> .
    <${filteredUri}> ?p2 ?o .
    ?o2 rdf:type <${filteredUri}> .
  }
  where {
      ${insertIntoGraph(queryBody, dbconfig, optional)}
      } `
}

/**
 * Sparql to retrieve incoming ressources for a given uri 
 * @param uri The baseUri for what the data should be fetched
 * @param dbconfig database configuration passed form the ui
 */
 export const sparqlIncoming = (uri, dbconfig) => {
  let defaultGraphsList = joinDefaultGraphs(dbconfig);
  if (defaultGraphsList !== "") {
    defaultGraphsList =
    sparqlOutgoingIncomingDefaultGraph(defaultGraphsList, uri, "INCOMING");
  } else {
    defaultGraphsList = `}`;
  }
  return constants.QUERY_PREFIXES+`
  prefix kge:   <https://pid.bayer.com/kge/> 
  construct {
  ?s ?p <${uri}>.
}

where {
{  
  values (?triplestore ?namedGraphs) {${joinAsValuesList(dbconfig)}
} 
  
  graph <https://pid.bayer.com/kge/triplestores> {
    ?triplestore rdf:type kge:Triplestore;
		rdfs:label ?label ;
        kge:password    ?password ;
        kge:queryPath   ?queryPath ;
        kge:runsOn      ?triplestroreSystem ;
        kge:updatePath  ?updatePath ;
        kge:user        ?username ;
  }
  graph <https://pid.bayer.com/kge/triplestoreSystems> {
    ?triplestroreSystem 
        kge:host      ?host ;
        kge:port      ?port ;
        kge:protocol  ?protocol .
  }
 
  bind ( uri(concat(str(?protocol),"://",?username,":",?password,"@",str(?host),":",str(?port),str(?queryPath))) as ?connectionURI )
  
  Service ?connectionURI{
      graph ?namedGraphs{
        ?s ?p <${uri}>   .  
}
} }${defaultGraphsList}
  `
}

/** not used
 * Sparql to retrieve outgoing resources for a given baseNode (uri)
 * @param uri The baseUri for what the data should be fetched
 * @param dbconfig database configuration passed form the ui
 */
 export const sparqlOutgoing = (uri, dbconfig) => {
  let defaultGraphsList = joinDefaultGraphs(dbconfig);
  if (defaultGraphsList !== "") {
    defaultGraphsList =
    sparqlOutgoingIncomingDefaultGraph(defaultGraphsList, uri, "OUTGOING");
  } else {
    defaultGraphsList = `}`;
  }
  return constants.QUERY_PREFIXES+`
  prefix kge:   <https://pid.bayer.com/kge/> 
  construct {
  <${uri}> ?p ?o.
}

where {
{  
  values (?triplestore ?namedGraphs) {${joinAsValuesList(dbconfig)}
} 
  
  graph <https://pid.bayer.com/kge/triplestores> {
    ?triplestore rdf:type kge:Triplestore;
		rdfs:label ?label ;
        kge:password    ?password ;
        kge:queryPath   ?queryPath ;
        kge:runsOn      ?triplestroreSystem ;
        kge:updatePath  ?updatePath ;
        kge:user        ?username ;
  }
  graph <https://pid.bayer.com/kge/triplestoreSystems> {
    ?triplestroreSystem 
        kge:host      ?host ;
        kge:port      ?port ;
        kge:protocol  ?protocol .
  }
 
  bind ( uri(concat(str(?protocol),"://",?username,":",?password,"@",str(?host),":",str(?port),str(?queryPath))) as ?connectionURI )
  
  Service ?connectionURI{
      graph ?namedGraphs{
        <${uri}> ?p ?o   .  
}
} }${defaultGraphsList}
  `
}


export const sparqlOutgoingVG = (uris, dbconfig) => {
  const queryBody = (uri) =>  {
    let listOfPictureUri = Object.entries(imageMapping)
    let stringOfPictureUris = "";
    listOfPictureUri.forEach(([key, value]) => {
      stringOfPictureUris += `|| ?p=<${key}> `
    });
    return `
    ?s ?p ?o .
    FILTER ( ?s=<${uri}> )
    FILTER (isLITERAL(?o) ${stringOfPictureUris})
    `
    //
  }

  return constants.QUERY_PREFIXES+`
  construct {
    ?s ?p ?o .
  }
  where {
    ${insertIntoVirtualGraph(queryBody,uris, dbconfig)}
  }
  `
}



  /**
   * takes into account federated query
   * @param uri 
   * @param limit 
   * @param dbconfig 
   */
  export const sparqlOutgoingFilterURI = (uri, childrenURIs, dbconfig) => {
    let nodeDataLinks = Object.keys(nodedatalinks)
    
    const equalsAny = (term, termArray) => termArray.map(x => `${term}=<${x}>`).reduce((f1, f2) => f1 + " || " + f2)
    const sameObjects = equalsAny("?o",childrenURIs)
    
    const queryBody = `
      <${uri}> ?p ?o .
      FILTER (${sameObjects})
      FILTER (!isLITERAL(?o) || LANG(?o) = "" || LANG(?o) = "en")
    `
    const optionalBody= `
      OPTIONAL {?o ?p2 ?o2 .
        FILTER (!isLITERAL(?o2) || LANG(?o2) = "" || LANG(?o2) = "en")
      }
    `
      
    return constants.QUERY_PREFIXES+`
    CONSTRUCT { 
      <${uri}> ?p ?o .
      ?o ?p2 ?o2 .
    }
    WHERE {
      ${insertIntoGraph(queryBody, dbconfig, optionalBody)}
    } # construct where
  `
  }

  export const sparqlAll = (dbconfig) => {
    return constants.QUERY_PREFIXES+`
  prefix kge:   <https://pid.bayer.com/kge/> 
    construct {
    ?s ?p ?o.
  }
  
  where {
    
    values (?triplestore ?namedGraphs) {${joinAsValuesList(dbconfig)}
  } 
    
    graph <https://pid.bayer.com/kge/triplestores> {
      ?triplestore rdf:type kge:Triplestore;
      rdfs:label ?label ;
          kge:password    ?password ;
          kge:queryPath   ?queryPath ;
          kge:runsOn      ?triplestroreSystem ;
          kge:updatePath  ?updatePath ;
          kge:user        ?username ;
    }
    graph <https://pid.bayer.com/kge/triplestoreSystems> {
      ?triplestroreSystem 
          kge:host      ?host ;
          kge:port      ?port ;
          kge:protocol  ?protocol .
    }
   
    bind ( uri(concat(str(?protocol),"://",?username,":",?password,"@",str(?host),":",str(?port),str(?queryPath))) as ?connectionURI )
    
    Service ?connectionURI{
        graph ?namedGraphs{
          ?s ?p ?o   .  
  }
  } }
  `
  }

  export const sparqlColid = (uri, graph) => {
    return constants.QUERY_PREFIXES+`
    prefix kge:   <https://pid.bayer.com/kge/> 
    CONSTRUCT {
      <${uri}> ?p ?o  .
    ?o rdf:type ?oType .
    ?o <https://pid.bayer.com/kos/19050/distribution> ?oDistribution .
    ?oDistribution rdf:type ?oDistributionType .
    ?oDistribution ?pDistribution ?dataDistributionStr .
    ?o ?p2 ?o2string .
    ?iS ?iP <${uri}> .
    ?iS rdf:type ?iType .
    ?iS <https://pid.bayer.com/kos/19050/distribution> ?iSdistribution .
    ?iSdistribution rdf:type ?iSdistributionType .
      ?iSdistribution ?ipDistribution ?iDataDistributionStr .
    ?iS ?iP2 ?iOstring .
  }
  where {
    values (?triplestore ?namedGraphs) {(<https://pid.bayer.com/kge/COLIDDataset><${graph}> )}
    graph <https://pid.bayer.com/kge/triplestores> {
      ?triplestore rdf:type kge:Triplestore;
                rdfs:label ?label ;
        kge:password    ?password ;
        kge:queryPath   ?queryPath ;
        kge:runsOn      ?triplestroreSystem ;
        kge:updatePath  ?updatePath ;
        kge:user        ?username ;
  }
  graph <https://pid.bayer.com/kge/triplestoreSystems> {
    ?triplestroreSystem
        kge:host      ?host ;
        kge:port      ?port ;
        kge:protocol  ?protocol .
  }

  bind ( uri(concat(str(?protocol),"://",?username,":",?password,"@",str(?host),":",str(?port),str(?queryPath))) as 
?connectionURI )

  Service ?connectionURI{
      graph  ?namedGraphs  
      {
        <${uri}> ?p ?o .
        OPTIONAL {
          ?o rdf:type ?oType .
        }
        OPTIONAL {
          ?iS ?iP <${uri}> .
          ?iS rdf:type ?iType .
        }
        OPTIONAL {
          ?o ?p2 ?o2 .
          FILTER (isLITERAL(?o2) || LANG(?o2) = "" || LANG(?o2) = "en")
        }
        OPTIONAL {
          ?iS ?iP <${uri}> .
          ?iS ?iP2 ?iO .
          FILTER (isLITERAL(?iO) || LANG(?iO) = "" || LANG(?iO) = "en")
        }	
        OPTIONAL {
          ?o <https://pid.bayer.com/kos/19050/distribution> ?oDistribution .
          ?oDistribution rdf:type ?oDistributionType .
          ?oDistribution ?pDistribution ?dataDistribution .
          FILTER (isLITERAL(?dataDistribution) || LANG(?dataDistribution) = "" || LANG(?dataDistribution) = "en")
        }
        OPTIONAL {
          ?iS ?iP <${uri}> .
          ?iS <https://pid.bayer.com/kos/19050/distribution> ?iSdistribution .
          ?iSdistribution rdf:type ?iSdistributionType .
                  ?iSdistribution ?ipDistribution ?iDataDistribution .
          FILTER (isLITERAL(?iDataDistribution) || LANG(?iDataDistribution) = "" || LANG(?iDataDistribution) = "en")
        }
        FILTER (?p not in (<https://pid.bayer.com/kos/19050/hasDraft>))
      }
    }
      OPTIONAL {
           ?o ?p2 ?o2 .
           FILTER EXISTS { ?sub rdf:type ?o }
       FILTER (isLITERAL(?o2) || LANG(?o2) = "" || LANG(?o2) = "en")
      }
    OPTIONAL {
           ?iS ?iP2 ?iO .
       FILTER EXISTS { ?sub rdf:type ?iS }
       FILTER (isLITERAL(?iO) || LANG(?iO) = "" || LANG(?iO) = "en") 
      }
      BIND(STR(?o2) as ?o2string)
    BIND(STR(?iO) as ?iOstring)
    BIND(STR(?dataDistribution) as ?dataDistributionStr)
      BIND(STR(?iDataDistribution) as ?iDataDistributionStr)
  }
  `
   
  }

/**
 * Sparql to retrieve a random subject based on a given offset number
 * @param number random offset number
 * @param dbconfig database configuration passed form the ui
 */
export const sparqlRandomSubject = (number, dbconfig) => {
  return constants.QUERY_PREFIXES+`
  prefix kge:   <https://pid.bayer.com/kge/> 
  construct {
    ?s ?p ?o.
}

where {
  
  values (?triplestore ?namedGraphs) {${joinAsValuesList(dbconfig)}
} 
  
  graph <https://pid.bayer.com/kge/triplestores> {
    ?triplestore rdf:type kge:Triplestore;
		rdfs:label ?label ;
        kge:password    ?password ;
        kge:queryPath   ?queryPath ;
        kge:runsOn      ?triplestroreSystem ;
        kge:updatePath  ?updatePath ;
        kge:user        ?username ;
  }
  graph <https://pid.bayer.com/kge/triplestoreSystems> {
    ?triplestroreSystem 
        kge:host      ?host ;
        kge:port      ?port ;
        kge:protocol  ?protocol .
  }
 
  bind ( uri(concat(str(?protocol),"://",?username,":",?password,"@",str(?host),":",str(?port),str(?queryPath))) as ?connectionURI )
  
  Service ?connectionURI{
      graph ?namedGraphs{
        ?s ?p ?o   .  
}
} }
  offset ${number}
  Limit 1`
}

/**
 * Sparql to retrieve a random position in the graph (offset used to query a random subject)
 * @param dbconfig database configuration passed form the ui
 */
export const sparqlRandomPosition = (dbconfig) => {
  return constants.QUERY_PREFIXES+`
  prefix kge:   <https://pid.bayer.com/kge/> 
  construct {
   rdfs:subject rdfs:numberOfIssues ?c .
}

where {
  
  values (?triplestore ?namedGraphs) {${joinAsValuesList(dbconfig)}
} 
  
  graph <https://pid.bayer.com/kge/triplestores> {
    ?triplestore rdf:type kge:Triplestore;
		rdfs:label ?label ;
        kge:password    ?password ;
        kge:queryPath   ?queryPath ;
        kge:runsOn      ?triplestroreSystem ;
        kge:updatePath  ?updatePath ;
        kge:user        ?username ;
  }
  graph <https://pid.bayer.com/kge/triplestoreSystems> {
    ?triplestroreSystem 
        kge:host      ?host ;
        kge:port      ?port ;
        kge:protocol  ?protocol .
  }
 
  bind ( uri(concat(str(?protocol),"://",?username,":",?password,"@",str(?host),":",str(?port),str(?queryPath))) as ?connectionURI )
  
  Service ?connectionURI{
      graph ?namedGraphs{
       SELECT   (count(?s) as ?c) 
      WHERE
        { ?s ?p ?o.
        }
}
} }
`
}

/**
 * SparQL to get the saved GraphData for a specific uuid
 * @param uuid Identifier of the stored GraphData
 */
export const sparqlGetSavedData = (uuid) => {
    return constants.QUERY_PREFIXES+`CONSTRUCT { <http://10.122.106.18:3000/graph/${uuid}> <http://10.122.106.18:3000/hasData> ?o }
      WHERE {
        <http://10.122.106.18:3000/graph/${uuid}> <http://10.122.106.18:3000/hasData> ?o .
      }`;
  }
// export const sparqlGetSavedData = (uuid) => {
//     return `CONSTRUCT { ?s ?p ?o }
//       WHERE {
//         <http://10.122.106.18:3000/graph/${uuid}> <http://10.122.106.18:3000/hasData> ?o .
//         ?s ?p ?o
//       }`;
//   }

/**
 * SparQL to post data to the TripleStore
 * @param uuid Identifier of the stored GraphData
 * @param data Data that should be stored
 */
export const sparqlPostData = (uuid, data) => {
    return `INSERT DATA {
          <http://10.122.106.18:3000/graph/${uuid}> <http://10.122.106.18:3000/hasData> "${data}"
        }`;
  }

  /**
   * SparQL to retrieve all virtualGraphs by a given triplestore
   */
export const  sparqlGetVirtualGraphs = (triplestores) => {
    const virtualGraphQuery = Object.keys(triplestores).map((store, index) => {
      const query = `
        service <db://system> {
          graph <tag:stardog:api:mappingsstore:store> {
            <tag:stardog:api:mappingsstore:graphs> <tag:stardog:api:mappingsstore:record> ?vg
            BIND("${store}" as ?db)
          }
        }
      `
      if (index === 0) {
        return `{ ${query} }`
      } else {
        const triplestore = triplestores[store];
        if (triplestore.type=="stardog"){
          return `{
            SERVICE <${triplestore.protocol}://${triplestore.user}:${triplestore.password}@${triplestore.serviceHost}:${triplestore.port}${triplestore.paths[0].dbpath}> { 
              ${query}
            }
          }`
        } else {
          return "{}"
        }
        
      }
    }).join("UNION")
    return constants.QUERY_PREFIXES+`
    CONSTRUCT {
      ?vg rdf:predicate ?db
      }
      WHERE  {
        select * where {
          ${virtualGraphQuery}
        } 
      }`
  }

  export const sparqlGetTripleStores = () => {
    return constants.QUERY_PREFIXES+`
    PREFIX kge:   <https://pid.bayer.com/kge/> 
    construct {
      ?triplestore  rdfs:label ?triplestoreLabel
     }
     WHERE {
       graph <https://pid.bayer.com/kge/triplestores>{
         ?triplestore rdf:type kge:Triplestore;
           kge:password    ?password ;
             kge:queryPath   ?queryPath ;
             kge:runsOn      ?triplestroreSystem ;
             kge:updatePath  ?updatePath ;
             kge:user        ?username ;
           rdfs:label ?triplestoreLabel .
       }
     }
    `
  }

  /**
   * SparQL to retrieve all named graphes
   */
export const sparqlGetNamedGraphs = (uri) => {
  return constants.QUERY_PREFIXES+`
  prefix kge:   <https://pid.bayer.com/kge/> 
  construct {
    <${uri}> kge:namedGraphs ?g
  } 
  WHERE {
    graph <https://pid.bayer.com/kge/triplestores>{
      <${uri}>	    kge:password    ?password ;
          kge:queryPath   ?queryPath ;
          kge:runsOn      ?triplestroreSystem ;
          kge:updatePath  ?updatePath ;
          kge:user        ?username ;
      rdfs:label ?triplestoreLabel .
    }
    graph <https://pid.bayer.com/kge/triplestoreSystems> {
      ?triplestroreSystem 
          kge:host      ?host ;
          kge:port      ?port ;
          kge:protocol  ?protocol .
  
    }
   
    bind ( uri(concat(str(?protocol),"://",?username,":",?password,"@",str(?host),":",str(?port),str(?queryPath))) as ?connectionURI )
    
    Service ?connectionURI{
      Select ?g {
        graph ?g{
          ?s ?p ?o
        }
  }
  }
  }
  `
}

export const sparqlOutgoingIncomingDefaultGraph = (defaultGraphsList, uri, flag ) => {
  let triplesCondition;
  if (flag == "INCOMING") {
  triplesCondition =  `?s ?p <${uri}>.`
  } else {
  triplesCondition =  `<${uri}> ?p ?o.`
  }  

  return `
  UNION {
    values (?triplestoreDefault) {${defaultGraphsList}}
    graph <https://pid.bayer.com/kge/triplestores> {
    ?triplestoreDefault rdf:type kge:Triplestore;
    rdfs:label ?label ;
    kge:password ?password ;
    kge:queryPath ?queryPath ;
    kge:runsOn ?triplestroreSystem ;
    kge:updatePath ?updatePath ;
    kge:user ?username ;
    }
    graph <https://pid.bayer.com/kge/triplestoreSystems> {
    ?triplestroreSystem
    kge:host ?host ;
    kge:port ?port ;
    kge:protocol ?protocol .
    }
    
    bind ( uri(concat(str(?protocol),"://",?username,":",?password,"@",str(?host),":",str(?port),str(?queryPath))) as ?connectionURI )
    
     Service ?connectionURI {
      ${triplesCondition}  
    }
    }}
  `;
};