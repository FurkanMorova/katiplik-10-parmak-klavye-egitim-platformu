export const generateRandomText = (
  allowedChars: string[],
  wordCount: number = 20,
  maxCharsPerWord: number = 5,
  customWords?: string[]
): string => {
  if (customWords && customWords.length > 0) {
    let result: string[] = [];
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * customWords.length);
        result.push(customWords[randomIndex]);
    }
    return result.join(" ");
  }

  if (!allowedChars || allowedChars.length === 0) return "";

  let result: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    const wordLength = Math.max(2, Math.floor(Math.random() * maxCharsPerWord) + 1);
    let word = "";

    for (let j = 0; j < wordLength; j++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      word += allowedChars[randomIndex];
    }
    
    result.push(word);
  }

  return result.join(" ");
};
