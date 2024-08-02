import { IIaProvider } from "@/providers/i-ia"
import { IDataBaseRepository } from "@/repositories/i-data-base-repository"
import { containsSQLKeywords } from "@/utils/anti-injection"
import { sqlInjection } from "./errors/sql-injection"

interface CreateAskTextSqlUseCaseRequest {
    question: string
    result: boolean
}

class CreateAskTextToSqlUseCase{
    constructor(private dataBaseRepository: IDataBaseRepository, private iaProvider: IIaProvider){
        this.iaProvider = iaProvider
        this.dataBaseRepository = dataBaseRepository
    }

    async execute({question, result}: CreateAskTextSqlUseCaseRequest){
        const sqlInjectionExists = containsSQLKeywords(question);

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
            result: result ? '' : 'Os dados não foram mostrados pois  a opção result não foi setada para true.'
        }        
    }
}

export {CreateAskTextToSqlUseCase}