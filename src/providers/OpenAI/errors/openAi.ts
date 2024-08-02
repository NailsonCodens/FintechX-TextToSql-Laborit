class OpenAiError  extends Error{
    public readonly openAiError: Error
    public readonly statusCode: number
    
    constructor(error: any, statusCode: 400){
        super()
        this.openAiError = error
        this.statusCode = statusCode
    }
}

export {OpenAiError}