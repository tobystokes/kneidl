<template>
  <form @submit.prevent="guessWord()">
    <label for="letter" class="u-invisible">Enter a letter:</label>
    <input
      type="text"
      class="u-invisible"
      v-model="state.guess"
      minlength="5"
      maxlength="5"
      required
      autocorrect="off"
    />
    <input type="submit" value="Submit" class="u-invisible" />
  </form>
</template>

<script setup>
import { useEventListener } from "@vueuse/core";
import { useGame } from "@/composables/useGame";
const { state, guessWord } = useGame();

useEventListener(document, "keyup", (event) => {
  if (
    event.key.length === 1 &&
    event.key.match(/[a-z]/i) &&
    state.guess.length < 5
  ) {
    state.guess += event.key.toUpperCase();
  }
  if (event.key === "Backspace") {
    state.guess = state.guess.slice(0, -1);
  }
  if (event.key === "Enter") {
    guessWord();
  }
});
</script>

<style scoped></style>
