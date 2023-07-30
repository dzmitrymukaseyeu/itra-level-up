import Fastify, {FastifyInstance, FastifyPluginOptions} from "fastify";
import {MongoClient} from "mongodb";
import {routeRegister, routeRegister2} from "./routeRegister.js";
import {BookTransformer} from "./bookTransformer.js";

const fastify = Fastify({
    logger: true
})

const mongoClient = await MongoClient.connect('mongodb://127.0.0.1:27017');

const book = new BookTransformer()

export const deps = {
    book,
    mongoClient,
    fastify
};

fastify.register(myPlugin)

function myPlugin (fastify: FastifyInstance, plugins: FastifyPluginOptions, done: () => void) {
    fastify.decorate('mongoClient')
    done();
}

fastify.register((f: FastifyInstance, plugins: FastifyPluginOptions, done: () => void)=> {
    f.get('/books3', () => {

        return fastify.mongoClient?.db('BooksDB').collection('Books').find()
    })
    
    
    done();
})

routeRegister(fastify, mongoClient, book);
routeRegister2(fastify, mongoClient,book);





await fastify.listen({port: 3000});
console.log('server start');
    