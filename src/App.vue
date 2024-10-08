<script setup>
import { useGameStore } from "@/stores/game";
const game = useGameStore();
import GameBoard from "./components/GameBoard.vue";
import Keyboard from "./components/Keyboard.vue";
import { onMounted } from "vue";
onMounted(() => {
  game.startNewGame();
});
</script>

<template>
  <div class="screen">
    <header></header>

    <main>
      <GameBoard />
    </main>
    <Keyboard />
  </div>
</template>

<style>
.screen {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100vh;
  max-width: 48rem;
  margin: auto;
}
</style>
