function containsSQLKeywords(text: string): boolean {
    const sqlKeywords = [
        'SELECT', 'UPDATE', 'DELETE', 'INSERT', 'DROP', 'ALTER', 'CREATE', 'FROM *',  
        'EXECUTE', 'TRUNCATE', 'RENAME', 'GRANT', 'REVOKE', 'UNION', '--', '#', ';'
    ];

    const regex = new RegExp(sqlKeywords.join('|'), 'i');
    
    return regex.test(text);
}

export {containsSQLKeywords}