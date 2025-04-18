export function isSubset(a : string, b : string) {
    const setB = new Set(b);
    return [...a].every(char => setB.has(char));
  }
  
export function stringDifference(a: string, b : string) {
    const setB = new Set(b);

    return [...new Set([...a].filter(char => !setB.has(char)))].join('');
}
  
  
export function getAllCharacterFromMax(digits : string){
  const maxDigit = Math.max(...digits.split("").map(Number));
  const cappedMax = Math.min(maxDigit + 1, 9);
  const all_digits = Array.from({ length: cappedMax + 1 }, (_, i) => i).join("");

  return all_digits
}

