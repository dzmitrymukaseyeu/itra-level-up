import {FastifyInstance, FastifyPluginOptions, FastifyRequest} from 'fastify'

const bookRoute = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    const mongodbCollection = fastify.mongo.db?.collection('Books');
    
    fastify.get('/books', async (request, reply) => {
        try {
            // const mssqlTable = await fastify.mssql.pool.connect()
            // console.log(mssqlTable, 'mssqlTbl')
            // const res = await fastify.mssql.pool.query('SELECT * from Books');
            // console.log(res)
            return await mongodbCollection?.find().toArray();
        } catch {
            throw new Error('Error')
        }
        
    })
    
    fastify.get('/books/:bookId', async (request: FastifyRequest<{Params: {bookId: string}}>, reply) => {
        try {
            const bookId = parseInt(request.params.bookId, 10);
            const book = await mongodbCollection?.findOne({id: parseInt(request.params.bookId)})
            if(!book) {
                return reply.status(404).send({message: 'Book not found'})
            }
                return book;
        } catch (e) {
            throw new Error('Error')
        }
    })
    
    fastify.post('/books', async (request: FastifyRequest<{Body: {title: string}}>, reply) => {
       try {
           const newBook = request.body;
           
           const result = await mongodbCollection?.insertOne(newBook)
           console.log(result)
       } catch (e) {
           throw new Error('Error')
       }
    })
}

export default bookRoute;