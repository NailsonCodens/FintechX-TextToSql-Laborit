import { IIaProvider } from "./i-ia";

class OpenIaProvider implements IIaProvider{
    async generateResponseSql(){
        console.log('works')
        const teste = 'teste'

        return teste
    }
}


export {OpenIaProvider}