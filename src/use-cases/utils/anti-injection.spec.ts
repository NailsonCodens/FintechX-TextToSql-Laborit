import { describe, it, expect } from 'vitest';
import { containsSqlInjections } from './anti-injection';

describe('Suite test sql anti injection', () => {
    it('should be able to return true for a string containing SQL keywords', () => {
        const text = 'SELECT * FROM users WHERE id = 1;';
        const sut = containsSqlInjections(text)
        expect(sut).toBe(true);
    });

    it('should be able to return false for a string without SQL keywords', () => {
        const text = 'This is a regular sentence without SQL keywords.';
        const sut = containsSqlInjections(text)
        expect(sut).toBe(false);
    });

    it('should ble able to return true for a string with SQL comments', () => {
        const text = 'This query has a comment -- and some SQL keywords.';
        const sut = containsSqlInjections(text)
        expect(sut).toBe(true);
    });

    it('should be able to return true for a string with SQL keywords in different cases', () => {
        const text = 'InSeRt INTO tabLe (col) VALUES (1);';
        const sut = containsSqlInjections(text)
        expect(sut).toBe(true);
    });

    it('should be able to return false for an empty string', () => {
        const text = '';
        const sut = containsSqlInjections(text)
        expect(sut).toBe(false);
    });

    it('should be able to return true for a string with SQL keywords and special characters', () => {
        const text = 'DROP TABLE users; -- This is a SQL command';
        const sut = containsSqlInjections(text)
        expect(sut).toBe(true);
    });
});
