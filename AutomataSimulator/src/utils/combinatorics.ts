import { Combination } from "js-combinatorics";

export function getAllCombinations(digits: string){

    let allCombinations = [];

    // Make an array from the digits so that we can use that for generating combinations
    // Make sure to sort the array for consistency
    // If combinations is not sorted then the path will always be the topmost path
    const digitsArray = digits.split("").sort();

    // Generate combinations for all lengths
    
    for (let length = 1; length <= digitsArray.length; length++) {
        const cmb = new Combination(digitsArray, length);
        allCombinations.push(...cmb.toArray().map((arr) => arr.join("")));
    }

  return allCombinations
}