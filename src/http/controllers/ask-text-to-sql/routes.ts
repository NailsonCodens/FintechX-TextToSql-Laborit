import { FastifyInstance } from "fastify";
import { CreateAskToSqlController } from "./create-ask-controller";

const createAskTextToSqlController = new CreateAskToSqlController()

export async function askTextToSqlRoutes(app: FastifyInstance){
    app.post('/ask', createAskTextToSqlController.create)
}