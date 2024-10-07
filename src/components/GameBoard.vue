<template>
  <div>
    <button type="button" @click="game.startNewGame()">Start New Game</button>
    <LetterInput />

    <h2>Guesses</h2>
    <ul>
      <li v-for="guess in game.guesses" :key="guess.id">
        <span
          v-for="(letter, i) in guess"
          :class="{
            right: letter == game.word[i],
            rlwp: game.word.includes(letter) && letter != game.word[i],
          }"
          >{{ letter }}</span
        >
      </li>
    </ul>
    <h3>guessedLetters</h3>
    {{ game.guessedLetters }}
    <h3>Game word</h3>
    {{ game.word }}
    <h3>incorrect:</h3>
    {{ game.incorrectLetters }}
    <h3>Game solved</h3>
    {{ game.solved }}
  </div>
</template>

<script setup>
import LetterInput from "./LetterInput.vue";
import { useGameStore } from "@/stores/game";
const game = useGameStore();
import { computed, ref } from "vue";
const guess = ref("");
const onSubmit = () => {
  game.guessWord(guess.value);
  guess.value = "";
};
</script>

<style scoped>
form {
  display: flex;
}
.right {
  background-color: green;
}
.rlwp {
  /* Right Letter, Wrong Place */
  background-color: yellow;
}
</style>
