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

<style>
.guess {
  display: grid;
  width: 100%;
  height: 20cqi;
  /* aspect-ratio: 5 / 1; */
  grid-template-columns: repeat(5, 1fr);
}
.guess .letter {
  font-size: 15cqi;
  position: relative;
  transition: background-color 0.4s;
  min-width: 1rem;
}

.guess .filled,
.guess .focussed {
  background-color: var(--col-primary);
  color: var(--col-bg);
}
.guess .focussed:before {
  content: "_";
  font-variation-settings: "wdth" 200;
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: step-start;
}

[data-invalid="true"] .letter {
  animation-name: shake;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
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
