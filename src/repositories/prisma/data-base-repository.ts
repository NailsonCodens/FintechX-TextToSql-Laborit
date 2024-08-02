import { Prisma, PrismaClient } from "@prisma/client";
import { IDataBaseRepository } from "../i-data-base-repository";
import prisma from "@/lib/prisma";

class DataBaseRepository implements IDataBaseRepository{
    repository: PrismaClient;

    constructor() {
      this.repository = prisma;
    }

    async showTablesEstructure(){
        // Obter tabelas
        const tables = await prisma.$queryRaw<{ TABLE_NAME: string }[]>`
        SELECT TABLE_NAME
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = ${process.env.DB_DATABASE}
        `;

        const tableNames = tables.map((table: { TABLE_NAME: any; }) => table.TABLE_NAME);

        // Obter colunas para todas as tabelas
        const columns = await prisma.$queryRaw<{
        TABLE_NAME: string;
        COLUMN_NAME: string;
        }[]>`
        SELECT TABLE_NAME, COLUMN_NAME
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = ${process.env.DB_DATABASE} AND TABLE_NAME IN (${Prisma.join(tableNames)})
        `;

        const schema: { [table: string]: string[] } = {};

        columns.forEach((column: { TABLE_NAME: string | number; COLUMN_NAME: string; }) => {
        if (!schema[column.TABLE_NAME]) {
            schema[column.TABLE_NAME] = [];
        }
        schema[column.TABLE_NAME].push(column.COLUMN_NAME);
        });

        return schema;
    }

    async showResultOftheQueryGenereted(query: string){        
        const result = await prisma.$queryRawUnsafe(query)

        return result
    }    
}

export {DataBaseRepository}