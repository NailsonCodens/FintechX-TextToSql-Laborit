import { IIaProvider } from "@/providers/i-ia";
import { OpenIaProvider } from "@/providers/open-ia";
import { CreateAskTextToSqlUseCase } from "../create-ask-text-to-sql";

export function makeCreateAskToSqlUseCase(){
    const openIaProvider: IIaProvider = new OpenIaProvider()

    const useCase = new CreateAskTextToSqlUseCase(openIaProvider)

    return useCase
}