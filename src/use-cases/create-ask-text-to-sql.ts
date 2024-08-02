import { IIaProvider } from "@/providers/i-ia"
import { IDataBaseRepository } from "@/repositories/i-data-base-repository"

class CreateAskTextToSqlUseCase{
    constructor(private dataBaseRepository: IDataBaseRepository, private iaProvider: IIaProvider){
        this.iaProvider = iaProvider
        this.dataBaseRepository = dataBaseRepository
    }

    async execute(){

        const schemaContext = await this.dataBaseRepository.showTablesEstructure()
        console.log(schemaContext)

        /*estructuresTable, 'Quais são os produtos mais vendidos em termos de quantidade?' */
        const responseTextToSql = await this.iaProvider.generateResponseSql({schemaContext, request: 'Quais são os produtos mais populares entre os clientes corporativos?'})
        console.log(responseTextToSql)
        return 'working'        
      
//        return schema;

 /*       const responseTextToSql = await this.iaProvider.generateResponseSql()
        console.log(responseTextToSql)
        return 'working'*/
    }
}

export {CreateAskTextToSqlUseCase}