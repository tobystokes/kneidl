<script setup>
import { useGameStore } from "@/stores/game";
const game = useGameStore();
import GameBoard from "./components/GameBoard.vue";
import Keyboard from "./components/Keyboard.vue";

import { onMounted } from "vue";
import LetterInput from "./components/LetterInput.vue";
onMounted(() => {
  game.startNewGame();
});
</script>

<template>
  <div class="screen">
    <header>
      <button type="button" @click="game.startNewGame()">Start New Game</button>
      <input
        type="range"
        v-model.number="game.boards"
        @change="game.changeBoardSize()"
        min="1"
        max="6"
      />
    </header>

    <main>
      <LetterInput />
      <div class="game-grid">
        <GameBoard v-for="i in game.boards" :board-index="i - 1" />
      </div>
      <div v-if="game.solved" class="solved">
        <h2>Les jeux sont fin!</h2>
        <button type="button" @click="game.startNewGame()">
          Start New Game
        </button>
      </div>
      <div v-if="!game.solved && game.remainingGuesses <= 0">you lost</div>
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
  display: inline-grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
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
