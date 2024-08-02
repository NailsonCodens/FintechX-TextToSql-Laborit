import { describe, it, expect, vi } from 'vitest';
import { IDataBaseRepository } from '@/repositories/i-data-base-repository';
import { IAiProvider } from '@/providers/i-ai';
import { SqlInjection } from './errors/sql-injection';
import { NullGenerateSqlResponse } from './errors/null-generate-sql-response';
import { containsSqlInjections } from '@/utils/anti-injection';
import { CreateAskTextToSqlUseCase } from './create-ask-text-to-sql';

const mockDataBaseRepository: IDataBaseRepository = {
    showTablesEstructure: vi.fn().mockResolvedValue({ }),
    showResultOftheQueryGenereted: vi.fn().mockResolvedValue([]),
};

const mockIaProvider: IAiProvider = {
    generateResponseSql: vi.fn().mockResolvedValue('SELECT * FROM mock_table'),
};

vi.mock('@/utils/anti-injection', () => ({
    containsSqlInjections: vi.fn(),
}));

describe('Suit test to', () => {
    it('should not be able to create a question if question contain sql injection', async () => {
        (containsSqlInjections as vi.Mock).mockReturnValue(true);

        const useCase = new CreateAskTextToSqlUseCase(mockDataBaseRepository, mockIaProvider);
        await expect(useCase.execute({ question: 'SELECT * FROM users WHERE id = 1;', result: false }))
            .rejects
            .toThrow(SqlInjection);
    });

    it('should not be able to return a sql if the sql generated is null', async () => {
        (containsSqlInjections as vi.Mock).mockReturnValue(false);
        mockIaProvider.generateResponseSql = vi.fn().mockResolvedValue(null);

        const useCase = new CreateAskTextToSqlUseCase(mockDataBaseRepository, mockIaProvider);
        await expect(useCase.execute({ question: 'Quais são os produtos mais vendidos?', result: true }))
            .rejects
            .toThrow(NullGenerateSqlResponse);
    });

    it('should be able to return sanitized SQL and null result if result is false', async () => {
        (containsSqlInjections as vi.Mock).mockReturnValue(false);
        mockIaProvider.generateResponseSql = vi.fn().mockResolvedValue('SELECT * FROM mock_table');

        const useCase = new CreateAskTextToSqlUseCase(mockDataBaseRepository, mockIaProvider);
        const response = await useCase.execute({ question: 'Qual é;', result: false });

        expect(response).toEqual({
            sql: 'SELECT * FROM mock_table',
            result: null,
        });
    });

    it('should return sanitized SQL and the query result if result is true', async () => {
        (containsSqlInjections as vi.Mock).mockReturnValue(false);
        mockIaProvider.generateResponseSql = vi.fn().mockResolvedValue('SELECT * FROM product WHERE id = 1');
        mockDataBaseRepository.showResultOftheQueryGenereted = vi.fn().mockResolvedValue([{ id: 1, product: 'Test Laborit' }]);

        const useCase = new CreateAskTextToSqlUseCase(mockDataBaseRepository, mockIaProvider);
        const response = await useCase.execute({ question: 'Qual é o produto de código 1 ?', result: true });

        expect(response).toEqual({
            sql: 'SELECT * FROM product WHERE id = 1',
            result: [{ id: 1, product: 'Test Laborit' }],
        });
    });
});
