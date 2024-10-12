<template>
  <ModalPanel>
    <h1>Game Over</h1>
    <p>oh well, the words were:</p>
    <ul>
      <li v-for="word in game.words">{{ word }}</li>
    </ul>
    <button @click="game.startNewGame()" class="button">New game</button>
  </ModalPanel>
</template>

<script setup>
import ModalPanel from "@/components/ModalPanel.vue";
import { useGameStore } from "@/stores/game";
const game = useGameStore();
</script>

<style></style>
