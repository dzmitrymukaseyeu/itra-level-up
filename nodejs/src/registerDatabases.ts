import fastifyMongo from "@fastify/mongodb";
import mssql from "fastify-mssql";
import {FastifyInstance} from "fastify";

export function registerDatabases(fastify: FastifyInstance) {
    fastify.register(fastifyMongo, {
        url: 'mongodb://127.0.0.1:27017/BooksDB'
    });
    
    fastify.register(mssql,
        {
            server: 'CMDB-118598\\SQLEXPRESS',
            port: 1433,
            user: '',
            password: '',
            database: 'BooksDB'
        });
}