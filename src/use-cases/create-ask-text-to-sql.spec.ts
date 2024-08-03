import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IAiProvider } from "@/providers/i-ai";
import { IDataBaseRepository } from "@/repositories/i-data-base-repository";
import { SqlInjection } from "./errors/sql-injection";
import { NullGenerateSqlResponse } from "./errors/null-generate-sql-response";
import { containsSqlInjections } from "@/use-cases/utils/anti-injection";
import { sanitizeText } from "@/use-cases/utils/sanitize";
import { CreateAskTextToSqlUseCase } from './create-ask-text-to-sql';

vi.mock('@/use-cases/utils/anti-injection');
vi.mock('@/use-cases/utils/sanitize');

describe('CreateAskTextToSqlUseCase', () => {
  let dataBaseRepository: vi.Mocked<IDataBaseRepository>;
  let iaProvider: vi.Mocked<IAiProvider>;
  let createAskTextToSqlUseCase: CreateAskTextToSqlUseCase;

  beforeEach(() => {
    dataBaseRepository = {
      showTablesEstructure: vi.fn(),
      showResultOftheQueryGenereted: vi.fn(),
    } as unknown as vi.Mocked<IDataBaseRepository>;

    iaProvider = {
      generateResponseSql: vi.fn(),
    } as unknown as vi.Mocked<IAiProvider>;

    createAskTextToSqlUseCase = new CreateAskTextToSqlUseCase(dataBaseRepository, iaProvider);
  });

  it('should throw SqlInjection error if SQL injection is detected', async () => {
    (containsSqlInjections as vi.Mock).mockReturnValue(true);

    await expect(createAskTextToSqlUseCase.execute({ question: 'DROP TABLE users;', result: true }))
      .rejects
      .toThrow(SqlInjection);
  });

  it('should throw NullGenerateSqlResponse error if responseTextToSql is null', async () => {
    (containsSqlInjections as vi.Mock).mockReturnValue(false);
    dataBaseRepository.showTablesEstructure.mockResolvedValue([]);
    iaProvider.generateResponseSql.mockResolvedValue(null);

    await expect(createAskTextToSqlUseCase.execute({ question: 'Liste todos os produtos que nós temos', result: true }))
      .rejects
      .toThrow(NullGenerateSqlResponse);
  });

  it('should return SQL and result when result is true', async () => {
    (containsSqlInjections as vi.Mock).mockReturnValue(false);
    (sanitizeText as vi.Mock).mockReturnValue('SELECT * FROM products LIMIT 10');
    dataBaseRepository.showTablesEstructure.mockResolvedValue([]);
    iaProvider.generateResponseSql.mockResolvedValue('SELECT * FROM users;');
    dataBaseRepository.showResultOftheQueryGenereted.mockResolvedValue([{ id: 1, product: 'Teste Laborit' }]);

    const response = await createAskTextToSqlUseCase.execute({ question: 'Quais são os 10 primeiros produtos?', result: true });

    expect(response).toEqual({
      sql: 'SELECT * FROM products LIMIT 10',
      result: [{ id: 1, product: 'Teste Laborit' }],
    });
  });

  it('should return SQL and null result when result is false', async () => {
    (containsSqlInjections as vi.Mock).mockReturnValue(false);
    (sanitizeText as vi.Mock).mockReturnValue("SELECT * FROM products WHERE product_name LIKE '%Ch%'");
    dataBaseRepository.showTablesEstructure.mockResolvedValue([]);
    iaProvider.generateResponseSql.mockResolvedValue('SELECT * FROM users;');

    const response = await createAskTextToSqlUseCase.execute({ question: 'Quais são os produtos com contém ch no nome?', result: false });

    expect(response).toEqual({
      sql: "SELECT * FROM products WHERE product_name LIKE '%Ch%'",
      result: null,
    });
  });
});
