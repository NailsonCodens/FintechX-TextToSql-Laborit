import { IIaProvider } from "@/providers/i-ia"
import { IDataBaseRepository } from "@/repositories/i-data-base-repository"
import { SqlInjection } from "./errors/sql-injection"
import { sanitizeText } from "@/utils/sanitize"
import { containsSqlInjections } from "@/utils/anti-injection"
import { NullGenerateSqlResponse } from "./errors/null-generate-sql-response"

interface CreateAskTextSqlUseCaseRequest {
    question: string
    result: boolean
}

interface CreateAskTextSqlUseCaseResponse{
    sql: string
    result: any | null
}

class CreateAskTextToSqlUseCase{
    constructor(private dataBaseRepository: IDataBaseRepository, private iaProvider: IIaProvider){
        this.iaProvider = iaProvider
        this.dataBaseRepository = dataBaseRepository
    }

    async execute({question, result}: CreateAskTextSqlUseCaseRequest): Promise<CreateAskTextSqlUseCaseResponse>{
        const sqlInjectionExists = containsSqlInjections(question);

        if(sqlInjectionExists){
            throw new SqlInjection()  
        }

        const schemaContext = await this.dataBaseRepository.showTablesEstructure()

        const responseTextToSql = await this.iaProvider.generateResponseSql({schemaContext, request: question})

        if(!responseTextToSql){
            throw new NullGenerateSqlResponse();
        }

        const resultTextToSql = sanitizeText(responseTextToSql)

        let resultQueryGenereted: any[] | unknown = []

        if(result){
            
        }
        resultQueryGenereted = result ? await this.dataBaseRepository.showResultOftheQueryGenereted(responseTextToSql) : null

        return {
            sql: resultTextToSql,
            result: resultQueryGenereted
        }        
    }
}

export {CreateAskTextToSqlUseCase}