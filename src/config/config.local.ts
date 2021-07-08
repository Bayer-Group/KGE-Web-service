import { ConfigFile } from "./configfile.model";

export const configlocal: ConfigFile = {
    app: {
        port: 8080,
        dbRequestTimeout: 60000
    },
    tripleStores: {
      KGEConfigDB: {
        host: 'localhost',
        protocol: 'http',
        serviceHost: "localhost",
        port: 3030,
        auth: 'Basic ' + Buffer.from('admin:admin').toString('base64'),
        type: "fuseki",
        paths: [
          { dbpath: "/colid-dataset/query", name: "colid-dataset" }
        ],
        path: "/colid-dataset/query",
      }
    },
    redisConfig: {
      host: "localhost",
      port: 6379,
      user: "",
      password: ""
    },
    colidGraph : "https://pid.bayer.com/resource/4.0"
}