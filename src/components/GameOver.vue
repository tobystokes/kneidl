<template>
  <div class="gameover">
    <h1 class="u-caps">{{ title }}</h1>
    <p>The words were:</p>
    <ul class="results game-grid">
      <li v-for="word in game.words" class="word" :class="result(word)">
        <span class="u-caps">{{ word }}</span>
        <a
          :href="'https://www.merriam-webster.com/dictionary/' + word"
          target="_blank"
        >
          <IconDictionary />
        </a>
      </li>
    </ul>
    <button
      class="button reverse"
      @click="
        routes.menuTab = 'stats';
        routes.toggleMenu();
      "
    >
      <span class="u-caps">Stats</span>
    </button>
    <button @click="game.startNewGame()" class="button reverse">
      <span class="u-caps">New game</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import IconDictionary from "@/components/IconDictionary.vue";
import { useGameStore } from "@/stores/game";
import { useRoutesStore } from "@/stores/routes";
const game = useGameStore();
const routes = useRoutesStore();
const props = defineProps({
  message: String,
});
const titles = ["JUUST", "BOGEY", "BRAVO", "BIRDY", "EAGLE", "WHOAH"];
const title = computed(() => {
  if (game.solved) {
    return titles[game.remainingGuesses];
  } else {
    return "NOPES";
  }
});
const result = (word) => (game.guesses.includes(word) ? "solved" : "unsolved");
</script>

<style>
.gameover {
  background-color: var(--col-primary);
  color: var(--col-bg);
  padding: var(--gutter);
  border-radius: 0.5em;
  margin-bottom: var(--gutter);
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  align-items: flex-start;
}
.gameover h1 {
  font-size: 3em;
  font-variation-settings: "wdth" 180, "wght" 600;
  line-height: 1;
  text-shadow: var(--letter-shadow);
  margin-top: 0.5em;
}
.results {
  width: 100%;
}
.word {
  display: inline-flex;
  justify-content: center;
  font-variation-settings: "wdth" 60, "wght" 600;
  font-size: 3em;
  background-color: var(--col-primary-50);
  /* aspect-ratio: 1; */
  padding: 0.25em;
  letter-spacing: 0.1em;

  text-transform: uppercase;
  text-shadow: var(--letter-shadow);
  border-radius: 0.125em;
}

.word.solved {
  color: var(--col-bg);
  background-color: var(--col-right);
}
.word.unsolved {
  color: var(--col-bg);
  background-color: var(--col-warm);
}
.word a {
  display: inline-flex;
  align-items: center;
  margin-left: 0.25em;
  color: inherit;
}
.word svg {
  height: 0.55em;
  width: auto;
  filter: drop-shadow(
    0.05em 0.05em 0 color-mix(in srgb, currentColor 25%, transparent)
  );
}
</style>
