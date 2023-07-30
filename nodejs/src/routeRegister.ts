import {FastifyInstance} from "fastify";
import {MongoClient} from "mongodb";
import {BookTransformer} from "./bookTransformer.js";

export const routeRegister = (fastify: FastifyInstance, mongoClient: MongoClient, bool: BookTransformer) => {
    fastify.get('/books', () => {
         
        return fastify.mongoClient?.db('BooksDB').collection('Books').find()
    });
};
export const routeRegister2 = (fastify: FastifyInstance, mongoClient: MongoClient, bool: BookTransformer) => {
    fastify.get('/books2', () => {
        return mongoClient.db('BooksDB').collection('Books').find()
    });
}