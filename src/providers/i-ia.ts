interface IIaProvider{
    generateResponseSql(): Promise<String>
}

export {IIaProvider}