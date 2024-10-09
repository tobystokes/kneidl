<template>
  <form @submit.prevent="game.guessWord()">
    <label for="letter" class="u-invisible">Enter a letter:</label>
    <input
      type="text"
      class="u-invisible"
      v-model="game.guess"
      minlength="5"
      maxlength="5"
      required
      autocorrect="off"
    />
    <input type="submit" value="Submit" class="u-invisible" />
  </form>
</template>

<script setup>
import { onMounted } from "vue";
import { useGameStore } from "@/stores/game";
const game = useGameStore();
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});
const onKeyUp = (event) => {
  console.log(event.key);
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
};
</script>

<style scoped></style>
