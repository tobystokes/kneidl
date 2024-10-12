<template>
  <ModalPanel>
    <h1>You won!</h1>
    <p>The words were:</p>
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
