---
sidebar_position: 1
---

# External STI Approach

MantisTable UI interacts with an API to integrate an external STI approach. This document describes the API endpoints, their methods, and how to configure MantisTable UI to use these endpoints.

:::warning
In order to use your own STI approach you need to implement an API by following the instructions on this page.
:::

## API Endpoints

The API must consists of two main endpoints:

1. **Semantic Table Interpretation**: This endpoint processes a given table and performs semantic interpretation.
2. **Get Table Annotations**: This endpoint returns the table along with its annotations.

## Configuration

The URL of the API endpoint and the names of the methods are configurable through the MantisTable UI configuration file (`.env`). The relevant configuration parameters are:

- `STI_HOST_UPLOAD_AND_PROCESS`: the endpoint name for performing semantic table interpretation.
- `STI_HOST_DOWNLOAD_ANNOTATIONS`: the endpoint name for retrieving table annotations.

### Example Configuration

```js
SEMANTIC_INTERPRETATION_METHOD =
  "https://selbat.datai.disco.unimib.it/dataset/createWithArray?token=selBat_demo_2023";
GET_ANNOTATIONS_METHOD =
  "http://vm.chronos.disco.unimib.it/dataset/${datasetName}/table/${table_id}?token=alligator_demo_2023";
```

:::warning
To modify the configuration file, refer to the page [Configuration](/docs/getting-started/configuration.md) page.
:::

## Endpoints

### 1. Perform Semantic Table Interpretation

**HTTP Method:** `POST`

**Description:** This endpoint accepts a table in JSON format only and performs semantic interpretation on it.

**Request Headers:**

- `Content-Type: application/json`

**Request Body:**

The data format that must be used to send the table to the STI service is:

```typescript
{
  datasetName: string;
  tableName: string;
  header: string[];
  rows: {
    idRow: number;
    data: string[];
  }[];
  kgReference: string;
}
```

An example of table formatted for the annotation process is:

```js
{
    "datasetName": "mantisTables",
    "tableName": "table",
    "header": ["col0", "col1"],
    "rows": [
      {
        "idRow": 1,
        "data": ["garraf", "3"]
      },
      {
        "idRow": 2,
        "data": ["beroun", ""]
      },
      {
        "idRow": 3,
        "data": ["prat de llobregat", "2"]
      },
      {
        "idRow": 4,
        "data": ["abisko turiststation", "1"]
      }
    ],
    "kgReference": "wikidata"
  }
```

**Response:**

```js
{
  "status": "Ok",
  "tables": [
    {
      "id": "66cdd62f961248695b90fc6b",
      "datasetName": "mantisTables",
      "tableName": "table"
    }
  ]
}
```

**Example Request:**

```sh
curl -X 'POST' \
  'https://selbat.datai.disco.unimib.it/dataset/createWithArray?token=selBat_demo_2023' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "datasetName": "mantisTables",
    "tableName": "table",
    "header": [
      "col0",
      "col1"
    ],
    "rows": [
    ...
```

**Example Response:**

```js
{
  "status": "success",
  "message": "Table interpreted successfully",
  "data": {
    "status": "Ok",
    "tables": [
      {
        "id": "66cdd62f961248695b90fc6b",
        "datasetName": "mantisTables",
        "tableName": "table"
      }
    ]
  }
}
```

### 2. Get Table Annotations

**HTTP Method:** `GET`

**Description:** This endpoint must return the table along with its semantic annotations.

**Request Headers:**

- `Content-Type: application/json`

**Request Parameters:**

- `datasetName`: the name of the dataset that the table belongs to.
- `table_id`: the unique identifier of the table.

**Response:**

The data format that must be used to receive the annotated table from the STI service is:

```typescript
{
  data: {
  datasetName: string;
  tableName: string;
  header: string[];
  rows: {
    idRow: number;
    data: string[];
  }[],
  semanticAnnotations: {
    cea: {
      idColumn: number;
      idRow: number;
      entities: {
        id: string;
        name: string;
        description: string;
        match: boolean;
        score: number;
        features: {
          id: string;
          value: number;
        }[];
        types: {
          id: string;
          name: string;
        }[];
      }[];
    }[]
    cta: {
      idColumn: number;
      types: {
        id: string;
        name: string;
        score: number;
      }[];
    }[]
    cpa: {
      idSourceColumn: string;
      idTargetColumn: string;
      predicates: {
        id: string;
        name: string;
        score: number;
      }[];
    }[]
  },
  metadata: {
    column: {
    idColumn: number;
    tag: string;
  }[];
  },
  status: "TODO" | "DOING" | "DONE";
  nrows: number;
};
}
```

An example of annotated table returned from the STI process is:

```js
{
  "status": "success",
  "data": {
    "data": {
      "datasetName": "mantisTables",
      "tableName": "1",
      "header": ["col0", "col1"],
      "rows": [
        {
          "idRow": 1,
          "data": ["garraf", "3"]
        },
        {
          "idRow": 2,
          "data": ["beroun", ""]
        },
        {
          "idRow": 3,
          "data": ["prat de llobregat", "2"]
        },
        {
          "idRow": 4,
          "data": ["abisko turiststation", "1"]
        }
      ],
      "semanticAnnotations": {
        "cea": [
          {
            "idColumn": 0,
            "idRow": 1,
            "entities": [
              {
                "id": "Q2204492",
                "name": "garraf",
                "types": [
                  {
                    "id": "Q55488",
                    "name": "railway station"
                  }
                ],
                "description": "railway station in sitges, spain",
                "match": true,
                "score": 0.979,
                "features": [
                  {
                    "id": "delta",
                    "value": 0.721
                  },
                  {
                    "id": "omega",
                    "value": 0.824
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.01
                  }
                ]
              },
              {
                "id": "Q456084",
                "name": "garraf",
                "types": [
                  {
                    "id": "Q40080",
                    "name": "beach"
                  },
                  {
                    "id": "Q3744088",
                    "name": "tourism region"
                  },
                  {
                    "id": "Q93352",
                    "name": "coast"
                  }
                ],
                "description": "tourism region in spain",
                "match": false,
                "score": 0.258,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.01
                  }
                ]
              },
              {
                "id": "Q5523785",
                "name": "garraf",
                "types": [
                  {
                    "id": "Q3055118",
                    "name": "single entity of population"
                  }
                ],
                "description": "human settlement in sitges, garraf, penedès, spain",
                "match": false,
                "score": 0.14,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.01
                  }
                ]
              }
            ]
          },
          {
            "idColumn": 1,
            "idRow": 1,
            "entities": []
          },
          {
            "idColumn": 0,
            "idRow": 2,
            "entities": [
              {
                "id": "Q9169473",
                "name": "beroun",
                "types": [
                  {
                    "id": "Q4167410",
                    "name": "Wikimedia disambiguation page"
                  }
                ],
                "description": "wikimedia disambiguation page",
                "match": true,
                "score": 0.98,
                "features": [
                  {
                    "id": "delta",
                    "value": 0.061
                  },
                  {
                    "id": "omega",
                    "value": 0.429
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              },
              {
                "id": "Q47497586",
                "name": "beroun",
                "types": [
                  {
                    "id": "Q13433827",
                    "name": "encyclopedia article"
                  }
                ],
                "description": "encyclopedia article",
                "match": false,
                "score": 0.919,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              },
              {
                "id": "Q23903289",
                "name": "beroun",
                "types": [
                  {
                    "id": "Q13433827",
                    "name": "encyclopedia article"
                  }
                ],
                "description": "encyclopedia article",
                "match": false,
                "score": 0.903,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              }
            ]
          },
          {
            "idColumn": 1,
            "idRow": 2,
            "entities": []
          },
          {
            "idColumn": 0,
            "idRow": 3,
            "entities": [
              {
                "id": "Q1894527",
                "name": "prat de llobregat",
                "types": [
                  {
                    "id": "Q55488",
                    "name": "railway station"
                  },
                  {
                    "id": "Q55491",
                    "name": "underground railway station"
                  },
                  {
                    "id": "Q22808403",
                    "name": "underground station"
                  }
                ],
                "description": "railway station in el prat de llobregat, catalonia, spain",
                "match": true,
                "score": 0.979,
                "features": [
                  {
                    "id": "delta",
                    "value": 0.06
                  },
                  {
                    "id": "omega",
                    "value": 0.428
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.01
                  }
                ]
              },
              {
                "id": "Q15619",
                "name": "prat de llobregat",
                "types": [
                  {
                    "id": "Q33146843",
                    "name": "municipality of Catalonia"
                  }
                ],
                "description": "municipality in baix llobregat, catalonia, spain",
                "match": false,
                "score": 0.919,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.07
                  }
                ]
              },
              {
                "id": "Q23932050",
                "name": "prat de llobregat",
                "types": [
                  {
                    "id": "Q3305213",
                    "name": "painting"
                  }
                ],
                "description": "painting by francesc gimeno",
                "match": false,
                "score": 0.643,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              }
            ]
          },
          {
            "idColumn": 1,
            "idRow": 3,
            "entities": []
          },
          {
            "idColumn": 0,
            "idRow": 4,
            "entities": [
              {
                "id": "Q4412158",
                "name": "abisko turiststation",
                "types": [
                  {
                    "id": "Q55488",
                    "name": "railway station"
                  }
                ],
                "description": "railway station in norrbotten county, sweden",
                "match": true,
                "score": 0.978,
                "features": [
                  {
                    "id": "delta",
                    "value": 0.058
                  },
                  {
                    "id": "omega",
                    "value": 0.426
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              },
              {
                "id": "Q66737990",
                "name": "abisko turiststation",
                "types": [
                  {
                    "id": "Q1406318",
                    "name": "holiday village"
                  },
                  {
                    "id": "Q27686",
                    "name": "hotel"
                  }
                ],
                "description": "tourist station in kiruna, sweden",
                "match": false,
                "score": 0.92,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              },
              {
                "id": "Q10542058",
                "name": "jävre turiststation",
                "types": [
                  {
                    "id": "Q1497375",
                    "name": "architectural ensemble"
                  }
                ],
                "description": "none",
                "match": false,
                "score": 0.004,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 0.7
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 0.5
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              }
            ]
          },
          {
            "idColumn": 1,
            "idRow": 4,
            "entities": []
          }
        ],
        "cpa": [
          {
            "idSourceColumn": 0,
            "idTargetColumn": 1,
            "predicates": [
              {
                "id": "P5595",
                "name": "number of platform faces",
                "score": 0.75
              },
              {
                "id": "P1103",
                "name": "number of platform tracks",
                "score": 0.525
              },
              {
                "id": "P2044",
                "name": "elevation above sea level",
                "score": 0.138
              },
              {
                "id": "P1538",
                "name": "number of households",
                "score": 0.018
              },
              {
                "id": "P2046",
                "name": "area",
                "score": 0.015
              }
            ]
          }
        ],
        "cta": [
          {
            "idColumn": 0,
            "types": [
              {
                "id": "Q55488",
                "name": "railway station",
                "score": 0.75
              },
              {
                "id": "Q3055118",
                "name": "single entity of population",
                "score": 0.25
              },
              {
                "id": "Q40080",
                "name": "beach",
                "score": 0.25
              },
              {
                "id": "Q3744088",
                "name": "tourism region",
                "score": 0.25
              },
              {
                "id": "Q93352",
                "name": "coast",
                "score": 0.25
              },
              {
                "id": "Q4167410",
                "name": "Wikimedia disambiguation page",
                "score": 0.25
              },
              {
                "id": "Q13433827",
                "name": "encyclopedia article",
                "score": 0.25
              },
              {
                "id": "Q55491",
                "name": "underground railway station",
                "score": 0.25
              },
              {
                "id": "Q22808403",
                "name": "underground station",
                "score": 0.25
              },
              {
                "id": "Q33146843",
                "name": "municipality of Catalonia",
                "score": 0.25
              }
            ]
          }
        ]
      },
      "metadata": {
        "column": [
          {
            "idColumn": 0,
            "tag": "SUBJ"
          },
          {
            "idColumn": 1,
            "tag": "LIT"
          }
        ]
      },
      "status": "DONE"
    },
    "pagination": {
      "currentPage": 1,
      "perPage": 10,
      "totalPages": 1,
      "totalItems": 4
    }
  }
}
```

**Example Request:**

```sh
curl -X 'GET' \
  'https://selbat.datai.disco.unimib.it/dataset/mantisTables/table/table?page=1&per_page=10&token=selBat_demo_2023' \
  -H 'accept: application/json'
```

**Example Response:**

```js
{
  "status": "success",
  "data": {
    "data": {
      "datasetName": "mantisTables",
      "tableName": "1",
      "header": ["col0", "col1"],
      "rows": [
        {
          "idRow": 1,
          "data": ["garraf", "3"]
        },
        {
          "idRow": 2,
          "data": ["beroun", ""]
        },
        {
          "idRow": 3,
          "data": ["prat de llobregat", "2"]
        },
        {
          "idRow": 4,
          "data": ["abisko turiststation", "1"]
        }
      ],
      "semanticAnnotations": {
        "cea": [
          {
            "idColumn": 0,
            "idRow": 1,
            "entities": [
              {
                "id": "Q2204492",
                "name": "garraf",
                "types": [
                  {
                    "id": "Q55488",
                    "name": "railway station"
                  }
                ],
                "description": "railway station in sitges, spain",
                "match": true,
                "score": 0.979,
                "features": [
                  {
                    "id": "delta",
                    "value": 0.721
                  },
                  {
                    "id": "omega",
                    "value": 0.824
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.01
                  }
                ]
              },
              {
                "id": "Q456084",
                "name": "garraf",
                "types": [
                  {
                    "id": "Q40080",
                    "name": "beach"
                  },
                  {
                    "id": "Q3744088",
                    "name": "tourism region"
                  },
                  {
                    "id": "Q93352",
                    "name": "coast"
                  }
                ],
                "description": "tourism region in spain",
                "match": false,
                "score": 0.258,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.01
                  }
                ]
              },
              {
                "id": "Q5523785",
                "name": "garraf",
                "types": [
                  {
                    "id": "Q3055118",
                    "name": "single entity of population"
                  }
                ],
                "description": "human settlement in sitges, garraf, penedès, spain",
                "match": false,
                "score": 0.14,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.01
                  }
                ]
              }
            ]
          },
          {
            "idColumn": 1,
            "idRow": 1,
            "entities": []
          },
          {
            "idColumn": 0,
            "idRow": 2,
            "entities": [
              {
                "id": "Q9169473",
                "name": "beroun",
                "types": [
                  {
                    "id": "Q4167410",
                    "name": "Wikimedia disambiguation page"
                  }
                ],
                "description": "wikimedia disambiguation page",
                "match": true,
                "score": 0.98,
                "features": [
                  {
                    "id": "delta",
                    "value": 0.061
                  },
                  {
                    "id": "omega",
                    "value": 0.429
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              },
              {
                "id": "Q47497586",
                "name": "beroun",
                "types": [
                  {
                    "id": "Q13433827",
                    "name": "encyclopedia article"
                  }
                ],
                "description": "encyclopedia article",
                "match": false,
                "score": 0.919,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              },
              {
                "id": "Q23903289",
                "name": "beroun",
                "types": [
                  {
                    "id": "Q13433827",
                    "name": "encyclopedia article"
                  }
                ],
                "description": "encyclopedia article",
                "match": false,
                "score": 0.903,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              }
            ]
          },
          {
            "idColumn": 1,
            "idRow": 2,
            "entities": []
          },
          {
            "idColumn": 0,
            "idRow": 3,
            "entities": [
              {
                "id": "Q1894527",
                "name": "prat de llobregat",
                "types": [
                  {
                    "id": "Q55488",
                    "name": "railway station"
                  },
                  {
                    "id": "Q55491",
                    "name": "underground railway station"
                  },
                  {
                    "id": "Q22808403",
                    "name": "underground station"
                  }
                ],
                "description": "railway station in el prat de llobregat, catalonia, spain",
                "match": true,
                "score": 0.979,
                "features": [
                  {
                    "id": "delta",
                    "value": 0.06
                  },
                  {
                    "id": "omega",
                    "value": 0.428
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.01
                  }
                ]
              },
              {
                "id": "Q15619",
                "name": "prat de llobregat",
                "types": [
                  {
                    "id": "Q33146843",
                    "name": "municipality of Catalonia"
                  }
                ],
                "description": "municipality in baix llobregat, catalonia, spain",
                "match": false,
                "score": 0.919,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0.07
                  }
                ]
              },
              {
                "id": "Q23932050",
                "name": "prat de llobregat",
                "types": [
                  {
                    "id": "Q3305213",
                    "name": "painting"
                  }
                ],
                "description": "painting by francesc gimeno",
                "match": false,
                "score": 0.643,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              }
            ]
          },
          {
            "idColumn": 1,
            "idRow": 3,
            "entities": []
          },
          {
            "idColumn": 0,
            "idRow": 4,
            "entities": [
              {
                "id": "Q4412158",
                "name": "abisko turiststation",
                "types": [
                  {
                    "id": "Q55488",
                    "name": "railway station"
                  }
                ],
                "description": "railway station in norrbotten county, sweden",
                "match": true,
                "score": 0.978,
                "features": [
                  {
                    "id": "delta",
                    "value": 0.058
                  },
                  {
                    "id": "omega",
                    "value": 0.426
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              },
              {
                "id": "Q66737990",
                "name": "abisko turiststation",
                "types": [
                  {
                    "id": "Q1406318",
                    "name": "holiday village"
                  },
                  {
                    "id": "Q27686",
                    "name": "hotel"
                  }
                ],
                "description": "tourist station in kiruna, sweden",
                "match": false,
                "score": 0.92,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 1
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 1
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              },
              {
                "id": "Q10542058",
                "name": "jävre turiststation",
                "types": [
                  {
                    "id": "Q1497375",
                    "name": "architectural ensemble"
                  }
                ],
                "description": "none",
                "match": false,
                "score": 0.004,
                "features": [
                  {
                    "id": "delta",
                    "value": null
                  },
                  {
                    "id": "omega",
                    "value": null
                  },
                  {
                    "id": "levenshtein_distance",
                    "value": 0.7
                  },
                  {
                    "id": "jaccard_distance",
                    "value": 0.5
                  },
                  {
                    "id": "popularity",
                    "value": 0
                  }
                ]
              }
            ]
          },
          {
            "idColumn": 1,
            "idRow": 4,
            "entities": []
          }
        ],
        "cpa": [
          {
            "idSourceColumn": 0,
            "idTargetColumn": 1,
            "predicates": [
              {
                "id": "P5595",
                "name": "number of platform faces",
                "score": 0.75
              },
              {
                "id": "P1103",
                "name": "number of platform tracks",
                "score": 0.525
              },
              {
                "id": "P2044",
                "name": "elevation above sea level",
                "score": 0.138
              },
              {
                "id": "P1538",
                "name": "number of households",
                "score": 0.018
              },
              {
                "id": "P2046",
                "name": "area",
                "score": 0.015
              }
            ]
          }
        ],
        "cta": [
          {
            "idColumn": 0,
            "types": [
              {
                "id": "Q55488",
                "name": "railway station",
                "score": 0.75
              },
              {
                "id": "Q3055118",
                "name": "single entity of population",
                "score": 0.25
              },
              {
                "id": "Q40080",
                "name": "beach",
                "score": 0.25
              },
              {
                "id": "Q3744088",
                "name": "tourism region",
                "score": 0.25
              },
              {
                "id": "Q93352",
                "name": "coast",
                "score": 0.25
              },
              {
                "id": "Q4167410",
                "name": "Wikimedia disambiguation page",
                "score": 0.25
              },
              {
                "id": "Q13433827",
                "name": "encyclopedia article",
                "score": 0.25
              },
              {
                "id": "Q55491",
                "name": "underground railway station",
                "score": 0.25
              },
              {
                "id": "Q22808403",
                "name": "underground station",
                "score": 0.25
              },
              {
                "id": "Q33146843",
                "name": "municipality of Catalonia",
                "score": 0.25
              }
            ]
          }
        ]
      },
      "metadata": {
        "column": [
          {
            "idColumn": 0,
            "tag": "SUBJ"
          },
          {
            "idColumn": 1,
            "tag": "LIT"
          }
        ]
      },
      "status": "DONE"
    },
    "pagination": {
      "currentPage": 1,
      "perPage": 10,
      "totalPages": 1,
      "totalItems": 4
    }
  }
}
```

## Conclusion

The API provides essential functionalities for semantic table interpretation and retrieval of annotations, which are crucial for MantisTable UI. Proper configuration of the API endpoints ensures seamless interaction between MantisTable UI and the external API.
