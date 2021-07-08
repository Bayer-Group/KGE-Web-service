export const pathResponse = {
    "head": {
      "vars": [
        "x",
        "x",
        "p",
        "forward",
        "y",
        "y"
      ]
    },
    "results": {
      "bindings": [
        {
          "p": {
            "type": "uri",
            "value": "http://10.122.106.18:3000/worksOn"
          },
          "forward": {
            "datatype": "http://www.w3.org/2001/XMLSchema#boolean",
            "type": "literal",
            "value": "true"
          },
          "x": {
            "type": "uri",
            "value": "http://pid.bayer.com/kos/19014/1/ggvcm"
          },
          "y": {
            "type": "uri",
            "value": "http://10.122.106.18:3000/KnowledgeSpace"
          }
        },
        {
          "p": {
            "type": "uri",
            "value": "http://10.122.106.18:3000/worksOn"
          },
          "forward": {
            "datatype": "http://www.w3.org/2001/XMLSchema#boolean",
            "type": "literal",
            "value": "false"
          },
          "x": {
            "type": "uri",
            "value": "http://10.122.106.18:3000/KnowledgeSpace"
          },
          "y": {
            "type": "uri",
            "value": "http://10.122.106.18:3000/Person/erik"
          }
        }
      ]
    }
  }

export const fullPathResult = {
    "nodes": [
      {
        "uri": "http://pid.bayer.com/kos/19014/1/ggvcm",
        "data": {
          "mainLabel": "Gökhan Coskun",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Gökhan Coskun"
            ]
          },
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
          }
        }
      },
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
        "uri": "http://10.122.106.18:3000/Person/erik",
        "data": {
          "mainLabel": "Erik Krummeich",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "prettyLabel": "label",
            "values": [
              "Erik Krummeich"
            ]
          },
          "http://10.122.106.18:3000/firstName": {
            "prettyLabel": "firstName",
            "values": [
              "Erik"
            ]
          },
          "http://10.122.106.18:3000/lastName": {
            "prettyLabel": "lastName",
            "values": [
              "Krummeich"
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
        "prettyLabel": "worksOn",
        "label": "http://10.122.106.18:3000/worksOn",
        "source": "http://10.122.106.18:3000/Person/erik",
        "target": "http://10.122.106.18:3000/KnowledgeSpace"
      }
    ]
  };