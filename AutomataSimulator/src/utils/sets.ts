export function isSubset(a : string, b : string) {
    const setB = new Set(b);
    return [...a].every(char => setB.has(char));
  }
  
export function stringDifference(a: string, b : string) {
    const setB = new Set(b);

    return [...new Set([...a].filter(char => !setB.has(char)))].join('');
}
  
  
export function getAllCharacterFromMax(digits : string){
  // Split string to array of numbers
  const maxDigit = Math.max(...digits.split("").map(Number));

  // Get the capped max , should be maxDigit from stringInput + 1 or 9
  const cappedMax = Math.min(maxDigit + 1, 9);

  // Generates string from 0 - the cappedMax
  const all_digits = Array.from({ length: cappedMax + 1 }, (_, i) => i).join("");

  return all_digits
}

