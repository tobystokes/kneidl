import { defineStore } from 'pinia';
import { default as wordlist } from "../wordlist.js";
export const useGameStore = defineStore('game', {
    state: () => ({
        /**
         * @type {string}
         * The five letter word to guess
         */
        word: '',

        /**
         * @type {string}
         * The current unsubmitted guess
         */
        guess: '',

        /**
         * @type {string[]}
         * Array of guessed words
         */
        guesses: [],

        /**
         * @type {number}
         * The maximum number of guesses allowed
         * Will vary on how many simulateous games are allowed
         */
        maxGuesses: 6,
    }),
    getters: {
        guessedLetters: (state) => {
            let unique = [...new Set(state.guesses.join(''))];
            return unique;
        },
        incorrectLetters: (state) => state.guessedLetters.filter(
            letter =>
                !state.word.includes(letter)),
        solved: (state) => state.guesses.some(guess => state.word === guess),
        invalidGuess: (state) => state.guess.length == 5 && wordlist.indexOf(state.guess.toUpperCase()) == -1,
        remainingGuesses: (state) => state.maxGuesses - state.guesses.length,
    },
    actions: {
        startNewGame() {
            // console.log('Starting new game');
            this.resetGame();
            // this.word = 'hello';
            this.word = wordlist[Math.floor(Math.random() * wordlist.length)]; // .toUpperCase()
            document.querySelector('input[type="text"').focus();
        },
        guessWord() {
            if (this.guess.length < 5 || this.invalidGuess) {
                return;
            }
            this.guesses.push(this.guess.toUpperCase());
            this.guess = '';
        },
        resetGame() {
            this.word = '';
            this.guess = '';
            this.guesses = [];
        }
    },
})