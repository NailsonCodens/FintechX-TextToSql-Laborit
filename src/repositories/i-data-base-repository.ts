interface IDataBaseRepository{
    showTablesEstructure(): Promise<any>
    showTableColumns(tableName: string): Promise<any>
}

export {IDataBaseRepository}