import { ref, reactive, computed } from 'vue'
import { default as wordlist } from "../wordlist.js";

const state = reactive({
    /**
        * @type {string[]}
        * The five letter word to guess
        */
    words: [],

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

    /**
     * @type {number}
     * The number of boards in play
     */
    boards: 1,
})

export function useGame() {

    const guessedLetters = computed(() => {
        let unique = [...new Set(state.guesses.join(''))];
        return unique;
    });
    const incorrectLetters = computed(() => guessedLetters.value.filter(
        letter =>
            !state.words.join('').includes(letter)));

    const solved = computed(() => state.words.every(word => state.guesses.includes(word)));

    const invalidGuess = computed(() => state.guess.length == 5 && wordlist.indexOf(state.guess.toUpperCase()) == -1);

    const remainingGuesses = computed(() => state.maxGuesses - state.guesses.length);

    const keyMarkers = computed(() => {
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
                } return 'cold';
            });
        });
        return keys;
    });


    function resetGame() {
        state.words = [];
        state.guesses = [];
        state.guess = '';
    }

    function startNewGame() {
        resetGame();
        // this.word = 'hello';
        for (let i = 0; i < state.boards; i++) {
            state.words.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
        }
    }

    function guessWord() {
        if (state.guess.length != 5 || invalidGuess.value) {
            return;
        }
        state.guesses.push(state.guess.toUpperCase());
        state.guess = '';
    }


    function changeBoardSize() {
        let diff = state.boards - state.words.length;
        if (diff < 0) {
            state.words = state.words.slice(0, state.boards);
        }
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                state.words.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
            }
        }
        state.maxGuesses = 5 + state.boards;

    }

    // function shuffleWordlist() {
    //     let array = wordlist;
    //     for (let i = array.length - 1; i >= 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    //     return array;
    // }


    return {
        state,
        guessedLetters,
        incorrectLetters,
        solved,
        invalidGuess,
        remainingGuesses,
        keyMarkers,
        startNewGame,
        guessWord,
        resetGame,
        changeBoardSize,
    }
}