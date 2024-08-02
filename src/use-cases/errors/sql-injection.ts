export class sqlInjection extends Error {
    constructor() {
      super('Não posso prosseguir pois existem códigos maliciosos na sua pergunta.')
    }
  }