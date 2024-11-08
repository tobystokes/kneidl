import { readFileSync, writeFileSync } from 'fs';

// Get the command-line arguments
const args = process.argv.slice(2);
const option = args[0];

const filePath = './src/wordlist.js';
let fileContent = readFileSync(filePath, 'utf-8');

// Extract the array from the file content
const arrayStart = fileContent.indexOf('[');
const arrayEnd = fileContent.lastIndexOf(']') + 1;
let wordArray = JSON.parse(fileContent.slice(arrayStart, arrayEnd));

if (option === 'random') {
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = wordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
} else if (option === 'alpha') {
  // Sort the array alphabetically
  wordArray.sort();
} else {
  console.error('Invalid option. Use "random" or "alpha".');
  process.exit(1);
}

const newArrayContent = JSON.stringify(wordArray);
const updatedFileContent = fileContent.slice(0, arrayStart) + newArrayContent;
writeFileSync(filePath, updatedFileContent, 'utf-8');
