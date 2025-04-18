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