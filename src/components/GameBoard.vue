<template>
  <div class="board">
    <TransitionGroup
      aria-label="Previous guesses"
      class="guesses"
      name="guess"
      tag="ul"
    >
      <li v-for="guess in preGuesses" :key="guess">
        <span
          v-for="(letter, i) in guess"
          :class="{
            letter: true,
            warm: word?.includes(letter) && letter != word?.charAt(i),
            right: letter == word[i],
            solved: guess == word,
          }"
          :style="{ animationDelay: `${i * 0.1}s` }"
          >{{ letter }}</span
        >
      </li>
    </TransitionGroup>

    <CurrentGuess
      v-if="!game.guesses.includes(word) && game.remainingGuesses > 0"
    />
    <template v-if="game.remainingGuesses > 0">
      <div class="remainingGuess" v-for="i in game.remainingGuesses - 1"></div>
    </template>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { computed } from "vue";
import CurrentGuess from "./CurrentGuess.vue";
const game = useGameStore();

const props = defineProps({
  boardIndex: Number,
});
const word = computed(() => game.words[props.boardIndex]);

const preGuesses = computed(() => {
  if (!word.value) return [];
  let solvedAfter = game.guesses.indexOf(word.value);
  return solvedAfter == -1
    ? game.guesses
    : game.guesses.slice(0, solvedAfter + 1);
});
</script>

<style>
.board {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  /* max-width: 24rem; */
  container-type: inline-size;
}
.guesses {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.guesses .letter {
  /*wrong */
  background-color: var(--col-primary-50);
  color: var(--col-bg);
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
  font-size: 22.5cqi;
}
.guesses li {
  display: grid;
  /* gap: 1px; */
  grid-template-columns: repeat(5, 1fr);
  /* perspective: 10rem; */
}
.remainingGuess {
  width: 100%;
  height: 2.5cqi;
  background-color: var(--col-primary-25);
  border-radius: 1cqi;
}

.guess-enter-active {
  animation: parent 1s;
}
.guess-enter-active .letter {
  transform: scaleY(0);
  transform-origin: center bottom;
  animation: bounce-in 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
/* .guess-leave-active {
  animation: bounce-in 0.5s reverse;
} */
@keyframes bounce-in {
  0% {
    transform: scaleY(0);
  }
  75% {
    transform: scaleY(1.2);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
