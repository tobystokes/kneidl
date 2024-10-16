<template>
  <ModalPanel>
    <h1>Game Over</h1>
    <p>oh well, the words were:</p>
    <ul class="results">
      <li v-for="word in game.words" class="word" :class="result(word)">
        <span class="letter" v-for="letter in word">{{ letter }}</span>
      </li>
    </ul>
  </ModalPanel>
</template>

<script setup>
import ModalPanel from "@/components/ModalPanel.vue";
import { useGameStore } from "@/stores/game";
const game = useGameStore();
const result = (word) => (game.guesses.includes(word) ? "solved" : "unsolved");
</script>

<style>
.results {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}
.word {
  display: inline-flex;
  font-variation-settings: "wdth" 60, "wght" 600;
  font-size: 3em;
}
.word .letter {
}
.word .letter:first-of-type {
  padding-left: 0.25em;
}
.word .letter:last-of-type {
  padding-right: 0.25em;
}
.word.solved .letter {
  color: var(--col-bg);
  background-color: var(--col-right);
}
.word.unsolved .letter {
  color: var(--col-bg);
  background-color: var(--col-warm);
}
</style>
