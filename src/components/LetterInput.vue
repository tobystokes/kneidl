<template>
  <div>
    <label for="letter">Enter a letter:</label>
    <form @submit.prevent="game.guessWord()">
      <input
        type="text"
        v-model="game.guess"
        minlength="5"
        maxlength="5"
        required
      />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
const game = useGameStore();
</script>

<style scoped>
label {
  /* hide from screen */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

input {
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
