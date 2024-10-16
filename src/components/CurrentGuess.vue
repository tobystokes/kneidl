<template>
  <div class="guess" :data-invalid="game.invalidGuess">
    <div
      class="letter"
      v-for="i in 5"
      :class="{
        filled: game.guess[i - 1],
        focussed: i == game.guess.length + 1,
      }"
    >
      {{ game.guess[i - 1] ?? " " }}
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
const game = useGameStore();
</script>

<style scoped>
.guess {
  display: grid;
  width: 100%;
  height: 20cqi;
  /* aspect-ratio: 5 / 1; */
  grid-template-columns: repeat(5, 1fr);
  /* gap: 1px; */
  /* perspective: 10rem; */
}
.letter {
  font-size: 15cqi;
  /* outline: var(--col-bg-light) solid 1px; */
  position: relative;
  transition: background-color 0.4s;
  min-width: 1rem;
}

.filled,
.focussed {
  background-color: var(--col-primary);
  color: var(--col-bg);
}
.focussed:before {
  content: "";
  position: absolute;
  bottom: 0.25em;
  width: 66%;
  border-bottom: 0.125em solid var(--col-bg);
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: step-start;
}

[data-invalid="true"] .letter {
  /* border: 3px solid red; */
  animation-name: shake;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
[data-invalid="true"] .letter {
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes shake {
  20%,
  80% {
    transform: translateX(-0.125rem);
  }

  60%,
  80% {
    transform: translateX(0.125rem);
  }

  30%,
  50%,
  70% {
    transform: translateX(-0.25rem);
  }

  40%,
  60% {
    transform: translateX(0.25rem);
  }
}
</style>
