<template>
  <div class="keyboard">
    <div class="row" v-for="(row, i) in rows">
      <button
        v-if="i == 2"
        @click="keyClick('⌫')"
        :disabled="game.guess.length == 0"
        class="wide"
      >
        ⌫
      </button>
      <button
        v-for="key in row"
        @click="keyClick(key)"
        :disabled="game.incorrectLetters.includes(key)"
      >
        {{ key }}
      </button>
      <button
        v-if="i == 2"
        @click="keyClick('↵')"
        :disabled="game.guess.length < 5"
        class="wide"
      >
        ↵
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
const game = useGameStore();

const rows = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  "ZXCVBNM".split(""),
];
const keyClick = (key) => {
  if (key === "⌫") {
    game.guess = game.guess.slice(0, -1);
  } else if (key === "↵") {
    game.guessWord();
  } else {
    game.guess += key;
  }
  // feels like an a11y no-no?
  document.querySelector('input[type="text"').focus();
};
</script>

<style scoped>
.keyboard {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background-color: var(--col-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.keyboard .row {
  display: flex;
  gap: 0.25rem;
}
.keyboard button {
  position: relative;
  padding: 0.4rem 0.5rem 0.2rem 0.5rem;
  border: none;
  color: var(--col-primary);
  background-color: var(--col-bg-light);
  border-radius: 0.25rem;
  cursor: pointer;
  text-transform: uppercase;
  font-variation-settings: "wdth" 100, "wght" 600;
  box-shadow: 0.2rem 0.2rem 0rem rgba(0, 0, 0, 0.1);
}
.keyboard button:active {
  transform: translateY(0.1rem);
  box-shadow: 0.1rem 0.1rem 0rem rgba(0, 0, 0, 0.1);
}
.keyboard button.wide {
  padding-inline: 0.75rem;
}
[disabled] {
  opacity: 0.5;
}
</style>
