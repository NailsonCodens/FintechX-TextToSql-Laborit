import "dotenv/config";
import fastify from "fastify";
import { askTextToSqlRoutes } from "@/http/controllers/ask-text-to-sql/routes";
import { ZodError } from "zod";
import cors from '@fastify/cors'
import { AiError } from "./providers/errors/openAi";

export const app = fastify()


app.register(cors, {
    origin: '*'
})

app.register(require('@fastify/swagger'), {
mode: 'static',
specification: {
    path: './swagger.json',
},
swagger: {
    info: {
    title: 'Api Text2Sql Laborit',
    description:
        'Esta api transforma linguagem natural em sql pronto para uso com base no schema do banco de dados usado',
    version: '0.1.0',
    },
    host: 'http://localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
},
    exposeRoute: true,
})
    app.register(require('@fastify/swagger-ui'), {
    routePrefix: '/',
})

app.register(askTextToSqlRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }

    if(error instanceof AiError){
        const {aiError, statusCode} = error
        reply.status(statusCode).send({message: aiError})
    } 

    if(error instanceof Error){
        return reply.status(400).send({message: error.message})
    }

    if (process.env.NODE_ENV !== 'production') {
        return reply.status(404).send({  })
    }
  
    return reply.status(500).send({ message: 'Internal server error.' })
})

