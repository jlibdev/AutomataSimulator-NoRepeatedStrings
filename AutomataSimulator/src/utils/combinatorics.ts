import { Combination } from "js-combinatorics";

export function getAllCombinations(digits: string){
    let allCombinations = [];
    const digitsArray = digits.split("").sort();

    for (let length = 1; length <= digitsArray.length; length++) {
        const cmb = new Combination(digitsArray, length);
        allCombinations.push(...cmb.toArray().map((arr) => arr.join("")));
    }

  return allCombinations
}