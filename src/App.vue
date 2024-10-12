<script setup>
import { onMounted } from "vue";
import { useGame } from "@/composables/useGame";
import GameBoard from "@/components/GameBoard.vue";
import Keyboard from "@/components/Keyboard.vue";

import LetterInput from "./components/LetterInput.vue";

const { state, startNewGame, changeBoardSize, remainingGuesses } = useGame();
onMounted(() => {
  startNewGame();
});
</script>

<template>
  <div class="screen">
    <header>
      <button type="button" @click="startNewGame()">Start New Game</button>
      <input
        type="range"
        v-model.number="state.boards"
        @change="changeBoardSize()"
        min="1"
        max="6"
      />
    </header>

    <main>
      <LetterInput />
      <div class="game-grid">
        <GameBoard v-for="i in state.boards" :board-index="i - 1" />
      </div>
      <div v-if="state.solved" class="solved">
        <h2>Les jeux sont fin!</h2>
        <button type="button" @click="startNewGame()">Start New Game</button>
      </div>
      <div v-if="!state.solved && remainingGuesses <= 0">you lost</div>
    </main>
    <Keyboard />
  </div>
</template>

<style>
.screen {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  max-width: 48rem;
  margin: auto;
}
main {
}
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 1rem;
  justify-content: center;
  margin: 1rem;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--col-primary);
  color: var(--col-bg-light);
}
</style>
