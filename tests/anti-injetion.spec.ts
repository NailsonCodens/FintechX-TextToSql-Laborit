import { containsSqlInjections } from '@/utils/anti-injection';
import { describe, it, expect } from 'vitest';

describe('Suite test sql ante injection', () => {
    it('should be able to return true for a string containing SQL keywords', () => {
        const text = 'SELECT * FROM users WHERE id = 1;';
        expect(containsSqlInjections(text)).toBe(true);
    });

    it('should be able to return false for a string without SQL keywords', () => {
        const text = 'This is a regular sentence without SQL keywords.';
        expect(containsSqlInjections(text)).toBe(false);
    });

    it('should ble able to return true for a string with SQL comments', () => {
        const text = 'This query has a comment -- and some SQL keywords.';
        expect(containsSqlInjections(text)).toBe(true);
    });

    it('should be able to return true for a string with SQL keywords in different cases', () => {
        const text = 'InSeRt INTO tabLe (col) VALUES (1);';
        expect(containsSqlInjections(text)).toBe(true);
    });

    it('should be able to return false for an empty string', () => {
        const text = '';
        expect(containsSqlInjections(text)).toBe(false);
    });

    it('should be able to return true for a string with SQL keywords and special characters', () => {
        const text = 'DROP TABLE users; -- This is a SQL command';
        expect(containsSqlInjections(text)).toBe(true);
    });
});
