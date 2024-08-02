export interface generateResponseSqlProps{
    schemaContext: string,
    request: string
}

interface IIaProvider{
    generateResponseSql({schemaContext, request}: generateResponseSqlProps): Promise<string | null>
}

export {IIaProvider}