import { getAllCombinations } from '@/utils/combinatorics';
import { getAllCharacterFromMax } from '../utils/sets';
import { generateFAElements } from '@/utils/state_generator';

export function useGetElements(userInput : string , includeAll : boolean = false)
{
    const unique_characters = [...new Set(userInput)];

    // Get all characters will input 09 when isFull is enabled to generate 0123456789 to get the full model else use the unique characters as basis
    const all_digits = getAllCharacterFromMax(includeAll ? "09" : unique_characters.join(""));

    // Function to get all the combinations using js-combinatorics
    const all_combinations = getAllCombinations(all_digits);

    // Generate the FAElements
    const elements = generateFAElements(all_combinations);

    return {states : elements.states , transitions : elements.transitions}
    
}
