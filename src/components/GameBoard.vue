<template>
  <div class="board">
    <ul aria-label="Previous guesses" class="guesses">
      <li v-for="guess in preGuesses">
        <span
          v-for="(letter, i) in guess"
          :class="{
            letter: true,
            warm: word?.includes(letter) && letter != word?.charAt(i),
            right: letter == word[i],
            solved: guess == word,
          }"
          >{{ letter }}</span
        >
      </li>
    </ul>

    <CurrentGuess
      v-if="!state.guesses.includes(word) && remainingGuesses > 0"
    />
    <template v-if="remainingGuesses > 0">
      <div class="remainingGuess" v-for="i in remainingGuesses - 1"></div>
    </template>
  </div>
</template>

<script setup>
import { useGame } from "@/composables/useGame";
import { computed } from "vue";
import CurrentGuess from "@/components/CurrentGuess.vue";
const { state, remainingGuesses } = useGame();

const props = defineProps({
  boardIndex: Number,
});
const word = computed(() => state.words[props.boardIndex]);

const preGuesses = computed(() => {
  if (!word.value) return [];
  let solvedAfter = state.guesses.indexOf(word.value);
  return solvedAfter == -1
    ? state.guesses
    : state.guesses.slice(0, solvedAfter + 1);
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
  max-width: 20rem;
  container-type: inline-size;
}
.guesses {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.guesses .letter {
  /*wrong */
  background-color: color-mix(in srgb, var(--col-primary) 75%, var(--col-bg));
  color: white;
  font-variation-settings: "wdth" 200, "wght" 250;
  font-size: 7.5cqi;
}
.guesses .right {
  background-color: var(--col-right);
  font-variation-settings: "wdth" 200, "wght" 600;
}
.guesses .warm {
  /* Right Letter, Wrong Place */
  background-color: var(--col-warm);
  font-variation-settings: "wdth" 200, "wght" 600;
}
.guesses .solved {
  font-variation-settings: "wdth" 60, "wght" 600;
  font-size: 200%;
}
.guesses li {
  display: grid;
  /* gap: 1px; */
  grid-template-columns: repeat(5, 1fr);
  /* perspective: 10rem; */
}
.remainingGuess {
  width: 100%;
  height: 0.5rem;
  background-color: var(--col-bg);
  border-radius: 0.125em;
}
</style>
