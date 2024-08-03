import { describe, it, expect } from 'vitest';
import { sanitizeText } from './sanitize';

describe('Suit test sanitize texts', () => {
    it('should be able to replace newlines and carriage returns with spaces', () => {
        const text = 'Line1\nLine2\r\nLine3\rLine4';
        const expected = 'Line1 Line2 Line3 Line4';
        const sut = sanitizeText(text)
        expect(sut).toBe(expected);
    });

    it('should be able to remove backticks from the text', () => {
        const text = 'This `is` a `test`';
        const expected = 'This is a test';
        const sut = sanitizeText(text)
        expect(sut).toBe(expected);
    });

    it('should be able to collapse multiple spaces into a single space', () => {
        const text = 'This   is  a    test';
        const expected = 'This is a test';
        const sut = sanitizeText(text)
        expect(sut).toBe(expected);
    });

    it('should be able to trim leading and trailing spaces', () => {
        const text = '   This is a test   ';
        const expected = 'This is a test';
        const sut = sanitizeText(text)
        expect(sut).toBe(expected);
    });

    it('should be able to handle an empty string', () => {
        const text = '';
        const expected = '';
        const sut = sanitizeText(text)
        expect(sut).toBe(expected);
    });

    it('should be able to handle a string with only newlines and spaces', () => {
        const text = '   \n   \r   \n   ';
        const expected = '';
        const sut = sanitizeText(text)
        expect(sut).toBe(expected);
    });
});
