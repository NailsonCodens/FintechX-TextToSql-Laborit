export class IsNotSqlQuery extends Error {
    constructor() {
      super('Não foi possível gerar um SQL válido pois a pergunta não foi satisfatória.')
    }
  }