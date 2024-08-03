function isSqlQuery(query: string): boolean {
    // Expressão regular básica para identificar palavras-chave SQL comuns
    const sqlPattern = /^(SELECT)\s/i;
    return sqlPattern.test(query.trim());
}

export {isSqlQuery}
