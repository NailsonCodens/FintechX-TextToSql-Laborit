import { FastifyInstance } from "fastify";
import { CreateAskToSqlController } from "./create";

const createAskTextToSqlController = new CreateAskToSqlController()

export async function askTextToSqlRoutes(app: FastifyInstance){
    app.post('/ask', createAskTextToSqlController.create)
}