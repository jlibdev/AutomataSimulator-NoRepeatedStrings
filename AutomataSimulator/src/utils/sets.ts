export function isSubset(a : string, b : string) {
    const setB = new Set(b);
    return [...a].every(char => setB.has(char));
  }
  
export function stringDifference(a: string, b : string) {
    const setB = new Set(b);

    return [...new Set([...a].filter(char => !setB.has(char)))].join('');
  }
  
  