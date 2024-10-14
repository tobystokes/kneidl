<template>
  <div class="screen">
    <header>
      <div class="container">
        <button type="button" @click="game.startNewGame()">
          Start New Game
        </button>
        <input
          type="range"
          v-model.number="game.boards"
          @change="game.changeBoardSize()"
          min="1"
          max="6"
        />
      </div>
    </header>

    <main>
      <div class="container">
        <LetterInput />
        <div class="game-grid">
          <GameBoard v-for="i in game.boards" :board-index="i - 1" />
        </div>
        <WonPanel v-if="game.solved"></WonPanel>
        <LostPanel
          v-if="!game.solved && game.remainingGuesses <= 0"
        ></LostPanel>
      </div>
    </main>
    <Keyboard />
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
const game = useGameStore();
import GameBoard from "@/components/GameBoard.vue";
import Keyboard from "@/components/Keyboard.vue";
import LostPanel from "@/components/LostPanel.vue";
import WonPanel from "@/components/WonPanel.vue";
import { onMounted } from "vue";
import LetterInput from "@/components/LetterInput.vue";
onMounted(() => {
  if (!game.words.length) game.startNewGame();
});
</script>

<style>
.screen {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  margin: auto;
  position: relative;
}
.container {
  max-width: 48rem;
  margin-inline: auto;
}
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  justify-content: center;
  margin: 1rem;
}
header {
  height: var(--header-height);
  background-color: var(--col-primary);
  color: var(--col-bg-light);
}
header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}
</style>
