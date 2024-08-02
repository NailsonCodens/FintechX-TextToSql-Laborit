export class NullGenerateSqlResponse extends Error {
    constructor() {
      super('Algo não funcionou como o esperado. Por favor tente novamente.')
    }
  }