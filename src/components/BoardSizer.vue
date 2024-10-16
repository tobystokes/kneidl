<template>
  <div>
    <fieldset class="board-sizer">
      <button
        @click="game.changeBoardSize(-1)"
        :disabled="game.boards == game.minBoards ? true : undefined"
      >
        -
      </button>
      <div
        class="meter"
        role="meter"
        :aria-valuenow="game.boards"
        :aria-valuemin="game.minBoards"
        :aria-valuemax="game.maxBoards"
      >
        <div v-for="i in game.maxBoards" :class="{ isBoard: i <= game.boards }">
          {{ i }}
        </div>
      </div>
      <button
        @click="game.changeBoardSize(1)"
        :disabled="game.boards == game.maxBoards ? true : undefined"
      >
        +
      </button>
    </fieldset>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
const game = useGameStore();
</script>

<style>
.board-sizer {
  display: flex;
}
.board-sizer button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--col-bg);
  font-size: 2vw;
}
.board-sizer button:first-of-type:before {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.board-sizer button:last-of-type:before {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.board-sizer .meter {
  display: flex;
  padding: 1cqi 2cqi;
  gap: 0.5cqi;
  background-color: var(--col-primary);
  margin-inline: 0.5cqi;
  box-shadow: 0.5cqi 1cqi 0 var(--col-primary-25);
}
.board-sizer .meter div {
  width: 2.5cqi;
  /* height: 1.5cqi; */
  color: var(--col-bg-50);
  border-radius: 0.5cqi;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10cqi;
  line-height: 0;
  padding-top: 0.25em;
  font-variation-settings: "wdth" 60, "wght" 200;
}
.board-sizer .meter .isBoard {
  color: var(--col-bg);
  font-variation-settings: "wdth" 60, "wght" 900;
}
</style>
