import { insertIntoGraph } from "./insertintograph.sparql";
import constants from "../../constants/constants";
import {
  joinAsValuesList,
  joinDefaultGraphs,
} from "../../services/helpers.service";

/**
 * SparQL to retrieve Autocomplete Values in Nquads based on a given Uri and dbconfig
 * @param uri selected base uri for the search
 * @param dbconfig database configuration passed form the ui
 */

export const sparqlAutocompleteIncomingInitial = (uri, dbconfig): string => {
  const queryBody = `
        ?s ?p <${uri}> .
        ?s ?p2 ?value FILTER isLITERAL(?value) .
      `;
  return (
    constants.QUERY_PREFIXES +
    `
      construct {
        ?s ?p <${uri}> .
        ?s ?p2 ?value .
  
    }
    where {
        ${insertIntoGraph(queryBody, dbconfig)}
      } LIMIT 5
      `
  );
};

/**
 * SparQL to retrieve Autocomplete Values in Nquads based on a given Uri and dbconfig
 * @param uri selected base uri for the search
 * @param str autocomplete input string
 * @param dbconfig database configuration passed form the ui
 */
export const sparqlAutocompleteIncoming = (uri, str, dbconfig) => {
  const queryBody = `
    ?s ?p <${uri}> .
    ?s ?p2 ?value FILTER isLITERAL(?value) .
    FILTER regex(str(?value), "${str}", "i") .
  `;
  return (
    constants.QUERY_PREFIXES +
    `
  construct {
    ?s ?p <${uri}> .
    ?s ?p2 ?value .

}
where {
    ${insertIntoGraph(queryBody, dbconfig)}
  } LIMIT 5
  `
  );
};

/**
 * SparQL to retrieve random Autocomplete Values in Nquads based on a given Uri and dbconfig
 * @param uri selected base uri for the search
 * @param dbconfig database configuration passed form the ui
 */
export const sparqlAutocompleteIncomingRandom = (uri, dbconfig) => {
  const queryBody = `
    ?s ?p <${uri}> .
    ?s rdfs:label ?o.
  `;
  return (
    constants.QUERY_PREFIXES +
    `
  construct { 
    ?s ?p ?o }
where {
    ${insertIntoGraph(queryBody, dbconfig)}
  } ORDER BY RAND() LIMIT 3 
  `
  );
};

export const sparqlAutocompleteOutgoingAdditional = (
  query,
  uri,
  filteredURIs,
  dbconfig
) => {
  const notSameTerm = (term, array) =>
    array
      .map((x) => `${term} != <${x}>`)
      .reduce((f1, f2) => f1 + " && " + f2, "true ");

  const queryBody = `
    select ?p ?o ?p2 ?o2 {
        ?s ?p ?o .
        FILTER (?s=<${uri}>)
        ?o ?p2 ?o2 .
        FILTER regex(str(?o2), "${query}", "i")
        FILTER (${notSameTerm("?o", filteredURIs)})
        FILTER isLITERAL(?o2) .
    }
    LIMIT 5
  `;

  return (
    constants.QUERY_PREFIXES +
    `
  CONSTRUCT {
    <${uri}> ?p ?o .
    ?o ?p2 ?o2 .
  }
  WHERE {
      ${insertIntoGraph(queryBody, dbconfig)}
  } #autocomplete construct
  `
  );
};

export const sparqlAutocompleteOutgoing = (query, dbconfig) => {
  let defaultGraphsList = joinDefaultGraphs(dbconfig);
  if (defaultGraphsList !== "") {
    defaultGraphsList =
      sparqlAutocompleteOutgoingDefaultGraph(defaultGraphsList);
  } else {
    defaultGraphsList = `}`;
  }
  return (
    constants.QUERY_PREFIXES +
    `
  prefix kge:   <https://pid.bayer.com/kge/> 
  construct {
  ?s ?p ?o.
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
        ?s ?p ?o   .    
         FILTER regex(str(?o), "${query}", "i") FILTER isLITERAL(?o) .
}
} }
${defaultGraphsList}  limit 10
  `
  );
};

export const sparqlAutocompleteOutgoingDefaultGraph = (defaultGraphsList) => {
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
    ?s ?p ?o
    FILTER regex(str(?o), "agent", "i") FILTER isLITERAL(?o)
    }
    }}
  `;
};
