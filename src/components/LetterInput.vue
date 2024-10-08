<template>
  <div>
    <form @submit.prevent="game.guessWord()" :data-invalid="game.invalidGuess">
      <label for="letter" class="u-invisible">Enter a letter:</label>
      <div class="guess">
        <div
          class="letter"
          v-for="i in 5"
          :style="tilt(i)"
          :class="{
            filled: game.guess[i - 1],
            focussed: i == game.guess.length + 1,
          }"
        >
          {{ game.guess[i - 1] }}
        </div>
        <input
          type="text"
          class=""
          v-model="game.guess"
          minlength="5"
          maxlength="5"
          required
          autocorrect="off"
        />
      </div>
      <input type="submit" value="Submit" class="u-invisible" />
    </form>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
const game = useGameStore();
const tilt = (i) => ({
  gridColumn: i,
  transform: `rotateY(${Math.random() * 20 - 10}deg) rotateX(${
    Math.random() * 6 - 3
  }deg) rotateZ(${Math.random() * 2 - 1}deg)`,
});
</script>

<style scoped>
.guess {
  display: grid;
  width: 100%;
  /* height: 20%; */
  aspect-ratio: 5 / 1;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  perspective: 10rem;
}
.guess .letter {
  grid-row: 1;
  font-size: 125%;
  /* outline: var(--col-bg-light) solid 1px; */
  position: relative;
}
.filled {
  background-color: var(--col-primary);
  color: var(--col-bg-light);
}
.focussed:before {
  content: "";
  position: absolute;
  bottom: 0.25em;
  width: 66%;
  border-bottom: 0.125em solid var(--col-primary);
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: step-start;
}
input[type="text"] {
  grid-row-start: 1;
  grid-column-start: 1;
  grid-row-end: 2;
  grid-column-end: 6;
  width: 100%;
  opacity: 0.01;
}
[data-invalid="true"] {
  border: 3px solid red;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
