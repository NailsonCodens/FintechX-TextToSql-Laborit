import { IIaProvider } from "@/providers/i-ia"

class CreateAskTextToSqlUseCase{
    constructor(private iaProvider: IIaProvider){
        this.iaProvider = iaProvider
    }

    async execute(){
        const responseTextToSql = await this.iaProvider.generateResponseSql()
        console.log(responseTextToSql)
        return 'working'
    }
}

export {CreateAskTextToSqlUseCase}