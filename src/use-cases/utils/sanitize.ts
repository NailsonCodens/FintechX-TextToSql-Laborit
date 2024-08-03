function sanitizeText(text: string): string {
    let sanitized = text.replace(/(\r\n|\n|\r)/gm, " ");

    sanitized = sanitized.replace(/`/g, "");

    sanitized = sanitized.replace(/\s+/g, " ");

    sanitized = sanitized.trim();

    return sanitized;
}

export {sanitizeText}
