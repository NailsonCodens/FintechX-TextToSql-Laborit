import { FastifyReply, FastifyRequest } from "fastify"
import { makeCreateAskToSqlUseCase } from "@/use-cases/factories/make-create-ask-to-sql"
import { validation } from "./validation"

class CreateAskToSqlController{
    async create(request: FastifyRequest, replay: FastifyReply){      
        const {question, result} = await validation(request)

        const createAskToSqlUseCase = makeCreateAskToSqlUseCase()

        const response = await createAskToSqlUseCase.execute({question, result})

        return replay.status(201).send({response})
    }
}

export {CreateAskToSqlController}

