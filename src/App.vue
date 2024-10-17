<template>
  <div class="screen">
    <header>
      <div class="container">
        <h1>KNEIDLE</h1>
      </div>
    </header>

    <main>
      <div class="container">
        <LetterInput></LetterInput>
        <GameOver v-if="game.solved || game.remainingGuesses <= 0" />
        <div class="game-grid">
          <GameBoard v-for="i in game.boards" :board-index="i - 1" />
        </div>
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
import GameOver from "@/components/GameOver.vue";
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

header {
  height: var(--header-height);
  background-color: var(--col-primary);
  color: var(--col-bg);
}
header .container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}
header h1 {
  font-size: 2.5em;
  line-height: 1;
  font-variation-settings: "wdth" 60, "wght" 800;
  margin: 0;
}
main {
  height: 100%;
  overflow-y: auto;
  /* touch-action: pan-y; */
  position: relative;
}
</style>
