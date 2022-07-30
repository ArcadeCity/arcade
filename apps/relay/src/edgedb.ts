import * as edgedb from 'edgedb'
import edgeql from '../dbschema/edgeql-js'

export const edgedbClient = edgedb.createClient({
  host: process.env.EDGEDB_HOST,
  port: parseInt(process.env.EDGEDB_PORT || '5656'),
  user: process.env.EDGEDB_USER,
  database: process.env.EDGEDB_DATABASE,
  password: process.env.EDGEDB_PASSWORD,
  tlsCA: process.env.EDGEDB_TLS_CA,
  tlsSecurity: process.env.EDGEDB_TLS_SECURITY as
    | 'default'
    | 'strict'
    | 'no_host_verification'
    | 'insecure',
})

export const e = edgeql
