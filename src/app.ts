import "dotenv/config";
import fastify from "fastify";
import { askTextToSqlRoutes } from "@/http/controllers/ask-text-to-sql/routes";
import { ZodError } from "zod";
import { AiError } from "./providers/errors/openAi";

export const app = fastify()

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