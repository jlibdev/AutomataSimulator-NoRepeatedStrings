export const getValidString = (userInputs: Array<string>) => {
    const seen_characters: Array<string> = [];

    for (const userInput of userInputs) {
      if (seen_characters.includes(userInput)) {
        break;
      } else {
        seen_characters.push(userInput);
      }
    }

    return seen_characters;
  };


export const isStringValid = (userInput : string) => {
  // Gets the unique values from the string using the Set() object function of javascript
   return new Set(userInput).size !== userInput.length;
}

export const getRepeatingCharacters = (str: string) => {
  // Object that tracks how many the characters has been seen
  const count: { [key: string]: number } = {};

  // Uses set() so that we dont get unecessary duplicated in the array
  const repeating = new Set<string>();

  // Iterate over the string
  for (let char of str) {
    // If count at key char has value then it means that that character has already been seen before , and therefore is a repeating character
    if (count[char]) {
      repeating.add(char);
    } else {
      // Else tag that character as seen
      count[char] = 1;
    }
  }

  // Return an array from the set()

  return Array.from(repeating);
}
