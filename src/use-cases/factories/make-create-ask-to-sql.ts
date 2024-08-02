import { IIaProvider } from "@/providers/i-ia";
import { CreateAskTextToSqlUseCase } from "../create-ask-text-to-sql";
import { IDataBaseRepository } from "@/repositories/i-data-base-repository";
import { DataBaseRepository } from "@/repositories/prisma/data-base-repository";
import { OpenIaProvider } from "@/providers/OpenAI/open-ia";

export function makeCreateAskToSqlUseCase(){
    const openIaProvider: IIaProvider = new OpenIaProvider()
    const databaseRepository: IDataBaseRepository = new DataBaseRepository()

    const useCase = new CreateAskTextToSqlUseCase(databaseRepository, openIaProvider)

    return useCase
}