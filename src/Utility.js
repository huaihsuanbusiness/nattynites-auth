
export const safeStringify = (obj) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    }, 2);
  };


  export function extracObject(metadata, fields) {

    function findUserInfo(obj, fields) {
      if (typeof obj === 'object' && obj !== null) {
  
        let result = {};
        fields.forEach(field => {
          if (field in obj) {
            result[field] = obj[field];
          }
        });
  
        if (Object.keys(result).length > 0) {
          return result;
        }
  
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            for (let item of obj[key]) {
              const nestedResult = findUserInfo(item, fields);
              if (nestedResult && Object.keys(nestedResult).length > 0) {
                return nestedResult;
              }
            }
          } else {
            const nestedResult = findUserInfo(obj[key], fields);
            if (nestedResult && Object.keys(nestedResult).length > 0) {
              return nestedResult;
            }
          }
        }
      }
  
      return null; // Return null if no fields are found
    }
  
    return findUserInfo(metadata, fields);
  }