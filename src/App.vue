<template>
  <div class="screen">
    <HeaderBar />
    <MenuPanel />
    <main v-if="!routes.menuOpen">
      <div class="container">
        <LetterInput></LetterInput>
        <GameOver v-if="game.gameOver" />
        <div class="game-grid">
          <GameBoard v-for="i in game.boards" :board-index="i - 1" />
        </div>
      </div>
    </main>
    <Keyboard v-if="!routes.menuOpen" />
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { useRoutesStore } from "@/stores/routes";
import GameBoard from "@/components/GameBoard.vue";
import Keyboard from "@/components/Keyboard.vue";
import GameOver from "@/components/GameOver.vue";
import LetterInput from "@/components/LetterInput.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import MenuPanel from "@/components/MenuPanel.vue";
const game = useGameStore();
const routes = useRoutesStore();
const { gameOver } = storeToRefs(game);

onMounted(() => {
  if (!game.words.length) game.startNewGame();
});

watch(gameOver, () => {
  console.log("gameOver ref changed, do something!");
});
</script>

<style>
.screen {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  margin: auto;
  /* position: static; */
  /* stop Safari iOS zoom */
  touch-action: none;
  user-select: none;
}
.container {
  max-width: 48rem;
  margin-inline: auto;
  padding-inline: var(--gutter);
}
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  justify-content: center;
  margin-block: var(--gutter);
}
main {
  height: 100%;
  overflow-y: auto;
  /* touch-action: pan-y; */
  position: relative;
}
</style>
