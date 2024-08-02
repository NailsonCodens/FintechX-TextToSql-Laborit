class AiError  extends Error{
    public readonly aiError: Error
    public readonly statusCode: number
    
    constructor(error: any, statusCode: 400){
        super()
        this.aiError = error
        this.statusCode = statusCode
    }
}

export {AiError}