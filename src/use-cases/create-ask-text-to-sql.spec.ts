import { beforeEach } from "node:test";
import { describe, it } from "vitest";
import { CreateAskTextToSqlUseCase } from "./create-ask-text-to-sql";
import { IDataBaseRepository } from "@/repositories/i-data-base-repository";
import { InMemoryDataBaseRepository } from "@/repositories/in-memory/in-memory-data-base-repository";

let inMemoryDataBaseRepository: IDataBaseRepository
let sut: CreateAskTextToSqlUseCase

describe('Suit test create ask texto to sql', () => {
    beforeEach(() => {
        inMemoryDataBaseRepository = new InMemoryDataBaseRepository()
        sut = new CreateAskTextToSqlUseCase(inMemoryDataBaseRepository)
    })

    it('should not be able to create a question if question contain sql injection', () => {

    })
})