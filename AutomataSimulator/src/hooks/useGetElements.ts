import { getAllCombinations } from '@/utils/combinatorics';
import { getAllCharacterFromMax } from '../utils/sets';
import { generateFAElements } from '@/utils/state_generator';

export function useGetElements(userInput : string , includeAll : boolean = false)

{
    const unique_characters = [...new Set(userInput)];
    const all_digits = getAllCharacterFromMax(includeAll ? "09" : unique_characters.join(""));

    const all_combinations = getAllCombinations(all_digits);

    const elements = generateFAElements(all_combinations);

    return {states : elements.states , transitions : elements.transitions}
    
}
