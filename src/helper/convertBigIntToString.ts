function convertBigIntToString(data: any): any {
    if (typeof data === 'bigint') {
      return data.toString();
    }
  
    if (Array.isArray(data)) {
      return data.map(item => convertBigIntToString(item));
    }
  
    if (typeof data === 'object' && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = convertBigIntToString(data[key]);
        return acc;
      }, {} as Record<string, any>);
    }
  
    return data;
  }

  export {convertBigIntToString}