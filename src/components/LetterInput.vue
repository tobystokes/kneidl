<template>
  <form @submit.prevent="game.guessWord()" class="u-invisible">
    <label for="letters">Enter a 5 letter word:</label>
    <input
      type="text"
      id="letters"
      v-model="game.guess"
      minlength="5"
      maxlength="5"
      required
      autocorrect="off"
    />
    <input type="submit" value="Submit" />
  </form>
</template>

<script setup>
import { useEventListener } from "@vueuse/core";
import { useGameStore } from "@/stores/game";
const game = useGameStore();

useEventListener(document, "keyup", (event) => {
  if (
    event.key.length === 1 &&
    event.key.match(/[a-z]/i) &&
    game.guess.length < 5
  ) {
    game.guess += event.key.toUpperCase();
  }
  if (event.key === "Backspace") {
    game.guess = game.guess.slice(0, -1);
  }
  if (event.key === "Enter") {
    game.guessWord();
  }
});
</script>

<style></style>
