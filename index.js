const fs = require("fs");
const { levenshtein } = require('./levenshtein');
const { wagnerFisher } = require('./wagner-fisher');

function generateSuggestion(wordToSuggest) {
  const file = fs.readFileSync("dictionary.txt", { encoding: "utf-8" });
  const words = file.split("\n");

  const wordExists = words.find((w) => w === wordToSuggest);
  if (wordExists) return [wordToSuggest];

  const suggestions = [];
  for (const word of words) {
    const diff = wagnerFisher(wordToSuggest, word);
    if (diff < 3) suggestions.push({ word, diff });
  }
  return suggestions
    .sort((w1, w2) => w1.diff > w2.diff)
    .map((w) => w.word)
    .filter((w, i) => i < 3);
}

const word = "hatt";
const suggestion = generateSuggestion(word);
console.log("suggestions: ", suggestion);