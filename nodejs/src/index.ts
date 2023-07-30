import Fastify from "fastify";
import {registerDatabases} from "./registerDatabases";
// import {registerRoutes} from "./registerRoutes";


const fastify = Fastify({
    logger: true
})

registerDatabases(fastify);
// registerRoutes(fastify);

fastify.listen({port: 3000}).then(() => {
    console.log('server start');
});
