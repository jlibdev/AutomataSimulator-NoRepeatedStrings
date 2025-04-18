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
   return new Set(userInput).size !== userInput.length;
}

export function getRepeatingCharacters(str: string): string[] {
  const count: { [key: string]: number } = {}; // <-- typed properly
  const repeating = new Set<string>();

  for (let char of str) {
    if (count[char]) {
      repeating.add(char);
    } else {
      count[char] = 1;
    }
  }

  return Array.from(repeating);
}
