import { IIaProvider } from "@/providers/i-ia"
import { IDataBaseRepository } from "@/repositories/i-data-base-repository"
import { sqlInjection } from "./errors/sql-injection"
import { sanitizeText } from "@/utils/sanitize"
import { containsSqlInjections } from "@/utils/anti-injection"

interface CreateAskTextSqlUseCaseRequest {
    question: string
    result: boolean
}

interface CreateAskTextSqlUseCaseResponse{
    sql: string
    result: Array<any> | null
}

class CreateAskTextToSqlUseCase{
    constructor(private dataBaseRepository: IDataBaseRepository, private iaProvider: IIaProvider){
        this.iaProvider = iaProvider
        this.dataBaseRepository = dataBaseRepository
    }

    async execute({question, result}: CreateAskTextSqlUseCaseRequest): Promise<CreateAskTextSqlUseCaseResponse>{
        const sqlInjectionExists = containsSqlInjections(question);

        if(sqlInjectionExists){
            throw new sqlInjection()  
        }

        const schemaContext = await this.dataBaseRepository.showTablesEstructure()

        const responseTextToSql = await this.iaProvider.generateResponseSql({schemaContext, request: question})


        const resultTextToSql = sanitizeText(responseTextToSql)

        if(result){
            console.log('exibir os resultados esperados')
        }

        return {
            sql: resultTextToSql,
            result: result ? [] : null
        }        
    }
}

export {CreateAskTextToSqlUseCase}