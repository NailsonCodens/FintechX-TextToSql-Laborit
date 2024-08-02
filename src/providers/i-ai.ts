export interface generateResponseSqlProps{
    schemaContext: string,
    request: string,
}

interface IAiProvider{
    generateResponseSql({schemaContext, request}: generateResponseSqlProps): Promise<string | null>
}

export {IAiProvider}