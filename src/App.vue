<template>
  <div class="screen">
    <HeaderBar />
    <MenuPanel />
    <main v-if="!routes.menuOpen">
      <LetterInput></LetterInput>
      <GameOver v-if="showGameOver" />
      <div class="game-grid">
        <GameBoard
          v-for="i in game.boards"
          :board-index="i - 1"
          @guess-reveal-complete="onFinalGuessReveal"
        />
      </div>
    </main>
    <Keyboard v-if="!routes.menuOpen && !showGameOver" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
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
const showGameOver = ref(false);
const waitingForFinalReveal = ref(false);

const onFinalGuessReveal = () => {
  if (!waitingForFinalReveal.value) return;
  waitingForFinalReveal.value = false;
  showGameOver.value = true;
};

onMounted(() => {
  if (!game.words.length) game.startNewGame();

  if (game.gameOver) {
    waitingForFinalReveal.value = false;
    showGameOver.value = true;
  }
});

watch(gameOver, (isGameOver) => {
  if (!!isGameOver) {
    game.saveStat();
    waitingForFinalReveal.value = true;
  } else {
    waitingForFinalReveal.value = false;
    showGameOver.value = false;
  }
});
</script>

<style>
.screen {
  max-width: var(--container-width);
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  /* stop Safari iOS zoom */
  touch-action: none;
  user-select: none;
  background-color: var(--col-bg);
  box-shadow: 0 0 4rem 0 rgba(0, 0, 0, 0.2);
  container-type: inline-size;
  container-name: screen;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  justify-content: center;
}

main {
  height: 100%;
  overflow-y: auto;
  /* touch-action: pan-y; */
  position: relative;
  padding: var(--gutter);
}
</style>
