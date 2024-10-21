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
    minBoards: 1,
    maxBoards: 8,

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

    stats: useStorage('stats', {}),
  }),
  getters: {
    guessedLetters: (state) => {
      let unique = [...new Set(state.guesses.join(''))];
      return unique;
    },

    disabledLetters: (state) => state.guessedLetters.filter(
      letter =>
        !state.unguessedWords.join('').includes(letter)),

    solved: (state) => state.words.every(word => state.guesses.includes(word)),

    invalidGuess: (state) => state.guess.length == 5 && wordlist.indexOf(state.guess.toUpperCase()) == -1,

    maxGuesses: (state) => 5 + state.boards,

    remainingGuesses: (state) => state.maxGuesses - state.guesses.length,

    gameOver: (state) => state.solved == true || state.remainingGuesses <= 0,

    statScore: (state) => state.guesses.length - state.boards,

    unguessedWords: (state) => state.words.filter(word => !state.guesses.includes(word)),

    keyMarkers: (state) => {
      let keys = {};
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        keys[letter] = state.unguessedWords
          .map(word => {
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

    changeBoardSize(int) {
      if (this.minBoards <= this.boards + int && this.boards + int <= this.maxBoards) {
        this.boards += int;
        this.words = wordlist.slice(this.usedWordIndex, this.usedWordIndex + this.boards);
      }
    },

    saveStat() {
      // stat format:
      // first keys are the number of boards
      // second keys are the number of remaining guesses
      // or -1 for a loss
      // { "1": { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0, "0": 0, "-1": 0 } }
      let stat = (!!this.solved) ? this.remainingGuesses : -1;

      if (this.stats[this.boards] == undefined) {
        this.stats[this.boards] = {};
      }
      if (this.stats[this.boards][stat] == undefined) {
        this.stats[this.boards][stat] = 0;
      }
      this.stats[this.boards][stat] += 1;
    }
  },
})
