<template>
  <div class="board">
    <button type="button" @click="game.startNewGame()">Start New Game</button>

    <ul aria-label="Previous guesses" class="guesses">
      <li v-for="guess in game.guesses" :key="guess.id">
        <span
          v-for="(letter, i) in guess"
          :class="{
            letter: true,
            warm: game.word.includes(letter) && letter != game.word[i],
            right: letter == game.word[i],
          }"
          :style="tilt()"
          >{{ letter }}</span
        >
      </li>
    </ul>

    <LetterInput v-show="!game.solved" />
    <div class="remainingGuess" v-for="i in game.remainingGuesses"></div>
  </div>
</template>

<script setup>
import LetterInput from "./LetterInput.vue";
import { useGameStore } from "@/stores/game";
const game = useGameStore();
import { computed } from "vue";
// can't be compuited because that caches the random values!
const tilt = () => ({
  transform: `rotateY(${Math.random() * 20 - 10}deg) rotateX(${
    Math.random() * 6 - 3
  }deg) rotateZ(${Math.random() * 2 - 1}deg)`,
});
</script>

<style scoped>
form {
  display: flex;
}
.board {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.guesses {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.guesses .letter {
  /*wrong */
  background-color: var(--col-primary);
  color: white;
  font-variation-settings: "wdth" 200, "wght" 250;
}
.guesses .right {
  background-color: var(--col-right);
  font-variation-settings: "wdth" 200, "wght" 800;
}
.guesses .warm {
  /* Right Letter, Wrong Place */
  background-color: var(--col-warm);
  font-variation-settings: "wdth" 200, "wght" 600;
}
.guesses li {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(5, 1fr);
  perspective: 10rem;
}
.remainingGuess {
  width: 100%;
  height: 0.5rem;
  background-color: var(--col-bg);
}
</style>
