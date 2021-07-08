export const d3OutgoingAdditional = {
    "nodes": [
      {
        "uri": "http://10.122.106.18:3000/KnowledgeSpace",
        "data": {
          "mainLabel": "Knowledge Space",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Knowledge Space"
            ]
          }
        }
      },
      {
        "uri": "http://pid.bayer.com/kos/19014/Person",
        "data": {
          "mainLabel": "Person",
          "isClass": true,
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Person"
            ]
          },
          "http://www.w3.org/2000/01/rdf-schema#comment": {
            "prettyLabel": "comment",
            "values": [
              "This is a person, saved in ontorest"
            ]
          }
        }
      },
      {
        "uri": "http://10.122.106.18:3000/Product/LinkedDataBasics",
        "data": {
          "mainLabel": "Training on Basics of Linked Data",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Training on Basics of Linked Data"
            ]
          }
        }
      },
      {
        "uri": "http://10.122.106.18:3000/bln_m427",
        "data": {
          "hasPicture": "https://transkript.de/fileadmin//transkript/01_Nachrichten/2020/2020_02_11_bayer_berlin.jpg",
          "mainLabel": "Building M427",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Building M427"
            ]
          },
          "http://10.122.106.18:3000/street": {
            "prettyLabel": "street",
            "values": [
              "Gerichtstr."
            ]
          }
        }
      },
      {
        "uri": "http://10.122.106.18:3000/companies/Bayer",
        "data": {
          "hasPicture": "https://bayernet.int.bayer.com/-/media/bag-intra/ws_bayernet/site-configuration/logo/bayer-logo.svg?la=de-DE&hash=D39973A6139797AC177B7D529C2F27F6",
          "mainLabel": "Bayer AG",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Bayer AG"
            ]
          }
        }
      },
      {
        "uri": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "data": {
          "mainLabel": "Gökhan Coskun",
          "hasPicture": "https://mug0eu-1.assets-yammer.com/mugshot/images/Ph0GLscW22mMsf2MPwTxw9K2DPD1J1fl",
          "http://10.122.106.18:3000/firstName": {
            "prettyLabel": "firstName",
            "values": [
              "Gökhan"
            ]
          },
          "http://10.122.106.18:3000/lastName": {
            "prettyLabel": "lastName",
            "values": [
              "Coskun"
            ]
          },
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Gökhan Coskun"
            ]
          }
        }
      }
    ],
    "links": [
      {
        "prettyLabel": "worksOn",
        "label": "http://10.122.106.18:3000/worksOn",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/KnowledgeSpace"
      },
      {
        "prettyLabel": "type",
        "label": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://pid.bayer.com/kos/19014/Person"
      },
      {
        "prettyLabel": "offers",
        "label": "http://10.122.106.18:3000/offers",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/Product/LinkedDataBasics"
      },
      {
        "prettyLabel": "isLocateIn",
        "label": "http://10.122.106.18:3000/isLocateIn",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/bln_m427"
      },
      {
        "prettyLabel": "affiliatedWith",
        "label": "http://10.122.106.18:3000/affiliatedWith",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/companies/Bayer"
      }
    ]
  };




  export const d3OutgoingResult2 = {
    "nodes": [
      {
        "data": {
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Gökhan Coskun"
            ]
          },
          "mainLabel": "Gökhan Coskun",
        },
        "uri": "http://pid.bayer.com/kos/19014/1/ggvcm",
      },
      {
        "data": {
          "mainLabel": "Unlabelled Node",
        },
        "uri": "http://10.122.106.18:3000/KnowledgeSpace",
      },
    ],
    "links": [
      {
        "prettyLabel": "worksOn",
        "label": "http://10.122.106.18:3000/worksOn",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/KnowledgeSpace"
      }
    ]
  };

  
  export const d3OutgoingResult3 = {
    "nodes": [
      {
        "uri": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "data": {
          "hasPicture": 'https://mug0eu-1.assets-yammer.com/mugshot/images/Ph0GLscW22mMsf2MPwTxw9K2DPD1J1fl',
          "http://10.122.106.18:3000/firstName": {
            "prettyLabel": "firstName",
            "values": [
              "Gökhan"
            ]
          },
          "http://10.122.106.18:3000/lastName": {
            "prettyLabel": "lastName",
            "values": [
              "Coskun"
            ]
          },
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Gökhan Coskun"
            ]
          },
          "mainLabel": "Gökhan Coskun"
        }
      },
      {
        "data": {
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Knowledge Space"
            ]
          },
          "mainLabel": "Knowledge Space",
        },
        "uri": "http://10.122.106.18:3000/KnowledgeSpace",
      },
      {
        "uri": "http://10.122.106.18:3000/bln_m427",
        "data": {
          "hasPicture": "https://transkript.de/fileadmin//transkript/01_Nachrichten/2020/2020_02_11_bayer_berlin.jpg",
          "mainLabel": "Building M427",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Building M427"
            ]
          },
          "http://10.122.106.18:3000/street": {
            "prettyLabel": "street",
            "values": [
              "Gerichtstr."
            ]
          }
        }
      },
      {
        "uri": "http://10.122.106.18:3000/companies/Bayer",
        "data": {
          "hasPicture": "https://bayernet.int.bayer.com/-/media/bag-intra/ws_bayernet/site-configuration/logo/bayer-logo.svg?la=de-DE&hash=D39973A6139797AC177B7D529C2F27F6",
          "mainLabel": "Bayer AG",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Bayer AG"
            ]
          }
        }
      },
      {
        "uri": "http://pid.bayer.com/kos/19014/Person",
        "data": {
          "mainLabel": "Person",
          "isClass": true,
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Person"
            ]
          },
          "http://www.w3.org/2000/01/rdf-schema#comment": {
            "prettyLabel": "comment",
            "values": [
              "This is a person, saved in ontorest"
            ]
          }
        }
      },
      {
        "uri": "http://10.122.106.18:3000/Product/LinkedDataBasics",
        "data": {
          "mainLabel": "Training on Basics of Linked Data",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Training on Basics of Linked Data"
            ]
          }
        }
      }
    ],
    "links": [
      {
        "prettyLabel": "worksOn",
        "label": "http://10.122.106.18:3000/worksOn",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/KnowledgeSpace"
      },
      {
        "prettyLabel": "type",
        "label": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://pid.bayer.com/kos/19014/Person"
      },
      {
        "prettyLabel": "offers",
        "label": "http://10.122.106.18:3000/offers",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/Product/LinkedDataBasics"
      },
      {
        "prettyLabel": "isLocateIn",
        "label": "http://10.122.106.18:3000/isLocateIn",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/bln_m427"
      },
      {
        "prettyLabel": "affiliatedWith",
        "label": "http://10.122.106.18:3000/affiliatedWith",
        "source": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "target": "http://10.122.106.18:3000/companies/Bayer"
      }
    ]
  };