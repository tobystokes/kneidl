import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'
import { default as wordlist } from "../wordlist.js";

export const useGameStore = defineStore('game', {
    state: () => ({
        /**
         * @type {string[]}
         * The five letter word to guess
         */
        words: useStorage('words', []),

        /**
         * @type {string}
         * The current unsubmitted guess
         */
        guess: '',

        /**
         * @type {string[]}
         * Array of guessed words
         */
        guesses: useStorage('guesses', []),

        /**
         * @type {number}
         * The number of boards in play
         */
        boards: useStorage('boards', 1),

        /**
         * @type {boolean}
         * check for key events etc
         */
        isActive: true,

        /**
         * @type {number}
         * Just gonna gradually move down the wordlist
         */
        usedWordIndex: useStorage('usedWordIndex', 0),
    }),
    getters: {
        guessedLetters: (state) => {
            let unique = [...new Set(state.guesses.join(''))];
            return unique;
        },
        incorrectLetters: (state) => state.guessedLetters.filter(
            letter =>
                !state.words.join('').includes(letter)),
        solved: (state) => state.words.every(word => state.guesses.includes(word)),
        invalidGuess: (state) => state.guess.length == 5 && wordlist.indexOf(state.guess.toUpperCase()) == -1,
        maxGuesses: (state) => 5 + state.boards,
        remainingGuesses: (state) => state.maxGuesses - state.guesses.length,
        keyMarkers: (state) => {
            let keys = {};
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
                keys[letter] = state.words.map(word => {
                    if (word.includes(letter)) {
                        for (let i = 0; i < 5; i++) {
                            if (word[i] == letter) {
                                if (state.guesses.some(guess => guess[i] == letter)) {
                                    return 'right';
                                } else if (state.guesses.some(guess => guess.includes(letter))) {
                                    return 'warm';
                                } else {
                                    return 'cold'; // no guesses yet!
                                }
                            }
                        }
                    } else {
                        return 'cold';
                    }
                });
            });
            return keys;
        },
    },
    actions: {
        startNewGame() {
            this.resetGame();
            this.words = wordlist.slice(this.usedWordIndex, this.usedWordIndex + this.boards);
        },
        guessWord() {
            if (this.guess.length != 5 || this.invalidGuess) {
                return;
            }
            this.guesses.push(this.guess.toUpperCase());
            this.guess = '';
        },
        resetGame() {
            this.usedWordIndex += this.words.length;
            this.words = [];
            this.guess = '';
            this.guesses = [];
        },
        changeBoardSize() {
            this.words = wordlist.slice(this.usedWordIndex, this.usedWordIndex + this.boards);
        }
    },
})