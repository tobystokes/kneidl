import { defineStore } from 'pinia';
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
        guesses: []
    }),
    getters: {
        guessedLetters: (state) => {
            let unique = [...new Set(state.guesses.join(''))];
            return unique;
        },
        incorrectLetters: (state) => state.guessedLetters.filter(
            letter =>
                !state.word.includes(letter)),
        solved: (state) => state.guesses.some(guess => state.word === guess)

    },
    actions: {
        startNewGame() {
            console.log('Starting new game');
            this.resetGame();
            this.word = 'hello';
        },
        guessWord() {
            this.guesses.push(this.guess);
            this.guess = '';
        },
        resetGame() {
            this.word = '';
            this.guess = '';
            this.guesses = [];
        }
    },
})