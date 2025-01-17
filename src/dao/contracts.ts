import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ContractsQuery } from "../models/contract-types";

const fetchContractsGraph = async () => await fetch(`https://core.csconfederation.com/graphql`,
    { method: "POST", 
        body: JSON.stringify({
            "operationName": "Contract",
            "query": `query Contract {
                franchises {
                  id
                  active
                  name
                  gm {
                    id
                    name
                    __typename
                  }
                  agm {
                    id
                    name
                    __typename
                  }
                  teams {
                    id
                    name
                    tier {
                      id
                      name
                      __typename
                    }
                    captain {
                      name
                      __typename
                    }
                    players {
                      id
                      name
                      type
                      mmr
                      contractDuration
                      tier {
                        name
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                tiers {
                  name
                  color
                  mmrCap
                  __typename
                }
                fas {
                  id
                  name
                  type
                  mmr
                  tier {
                    id
                    name
                    __typename
                  }
                  __typename
                }
              }`,
            "variables": {}      
        })
    })
    .then( async response => {
        return response.json();
    } );

export function useFetchContractGraph(): UseQueryResult<ContractsQuery> {
    return useQuery({ queryKey: ["contracts-graph"], queryFn: fetchContractsGraph, staleTime: 1000 * 60 * 60}); // 1 second * 60 * 60 = 1 hour
}

const fetchSchemaIntrospection = async () => await fetch(`https://core.csconfederation.com/graphql`,
    { method: "POST", 
        body: JSON.stringify({
            "operationName": "Contract",
            "query": "query Contract {  franchises {    id    active    name    gm {      id      name\n      __typename\n    }\n    agm {\n      id\n      name\n      __typename\n    }\n    teams {\n      id\n      name\n      tier {\n        id\n        name\n        __typename\n      }\n      captain {\n        name\n        __typename\n      }\n      players {\n        id\n        name\n        type\n        mmr\n        contractDuration\n        tier {\n          name\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  tiers {\n    name\n    color\n    mmrCap\n    __typename\n  }\n  fas {\n    id\n    name\n    type\n    mmr\n    tier {\n      id\n      name\n      __typename\n    }\n    __typename\n  }\n}",
            "variables": {}      
        })
    })
    .then( async response => {
        console.info( response );
        return response;
    } );

export function useSchemaIntrospection(): UseQueryResult<unknown> {
    return useQuery({ queryKey: ["graph-introspection"], queryFn: fetchSchemaIntrospection, staleTime: 1000 * 60 * 60}); // 1 second * 60 * 60 = 1 hour
}