import { CreateAskTextToSqlUseCase } from "../create-ask-text-to-sql";
import { DataBaseRepository } from "@/repositories/prisma/data-base-repository";
import { OpenIaProvider } from "@/providers/open-ai/open-ia";

export function makeCreateAskToSqlUseCase(){
    const iaProvider = new OpenIaProvider()
    const databaseRepository = new DataBaseRepository()

    const useCase = new CreateAskTextToSqlUseCase(databaseRepository, iaProvider)

    return useCase
}