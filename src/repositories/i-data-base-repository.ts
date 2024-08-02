// Definindo um tipo genérico
type GenericObject<T> = {
    [key: string]: T;
  };
  

interface IDataBaseRepository{
    showTablesEstructure(): Promise<any>
    showResultOftheQueryGenereted(query: string): Promise<Array<GenericObject<any>> | unknown>
}

export {IDataBaseRepository}