import { FastifyReply, FastifyRequest } from "fastify"
import { makeCreateAskToSqlUseCase } from "@/use-cases/factories/make-create-ask-to-sql"

class CreateAskToSqlController{
    async create(request: FastifyRequest, replay: FastifyReply){
        const createAskToSqlUseCase = makeCreateAskToSqlUseCase()

        const response = await createAskToSqlUseCase.execute()

        return replay.status(201).send({response})
    }
}

export {CreateAskToSqlController}