
const neo4j = require('neo4j-driver');

export const driver = neo4j.driver(process.env.NEO4J_CLUSTER, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4j_PASSWORD));

