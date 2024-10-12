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
            // console.log('Starting new game');
            this.resetGame();
            // this.word = 'hello';
            for (let i = 0; i < this.boards; i++) {
                this.words.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
            }
            // this.word = wordlist[Math.floor(Math.random() * wordlist.length)]; // .toUpperCase()
        },
        guessWord() {
            if (this.guess.length != 5 || this.invalidGuess) {
                return;
            }
            this.guesses.push(this.guess.toUpperCase());
            this.guess = '';
        },
        resetGame() {
            this.words = [];
            this.guess = '';
            this.guesses = [];
        },
        changeBoardSize() {
            let diff = this.boards - this.words.length;
            if (diff < 0) {
                this.words = this.words.slice(0, this.boards);
            }
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    this.words.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
                }
            }
        }
    },
})