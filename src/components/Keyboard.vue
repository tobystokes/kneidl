<template>
  <div class="keyboard-bg">
    <div
      class="keyboard-overlay"
      v-if="game.solved || game.remainingGuesses <= 0"
    >
      <button @click="game.startNewGame()" class="button">New game</button>
    </div>
    <div class="keyboard-cq">
      <div class="keyboard">
        <BoardSizer />
        <div class="row" v-for="(row, i) in rows">
          <button
            v-if="i == 2"
            @click="keyClick('⌫')"
            :disabled="game.guess.length == 0"
            class="icon"
          >
            <IconDelete />
          </button>
          <button
            v-for="key in row"
            @click="keyClick(key)"
            :disabled="game.disabledLetters.includes(key)"
            :style="keystyle[key]"
          >
            {{ key }}
          </button>
          <button
            v-if="i == 2"
            @click="keyClick('↵')"
            :disabled="game.guess.length < 5"
            class="icon"
          >
            <IconEnter />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "@/stores/game";
import BoardSizer from "@/components/BoardSizer.vue";
import IconDelete from "./IconDelete.vue";
import IconEnter from "./IconEnter.vue";
const game = useGameStore();

const keystyle = computed(() => {
  let keystyle = {};
  for (const [key, arr] of Object.entries(game.keyMarkers)) {
    if (arr.length > 0) {
      if (arr.length == 1) {
        keystyle[key] = {
          "--keystyle": `var(--col-${arr[0]})`,
        };
        continue;
      }
      let angles = arr
        .map((state, index) => {
          let angle = 360 / arr.length;
          if (index == 0) {
            angle = angle + "deg";
          } else if (index == arr.length - 1) {
            angle = angle * index + "deg";
          } else {
            angle = angle * index + "deg " + angle * (index + 1) + "deg";
          }

          return `var(--col-${state}) ${angle}`;
        })
        .join(",");
      keystyle[key] = {
        "--keystyle": `conic-gradient(from -90deg, ${angles})`,
      };
    }
  }
  return keystyle;
});

const rows = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  "ZXCVBNM".split(""),
];
const keyClick = (key) => {
  if (key === "⌫") {
    game.guess = game.guess.slice(0, -1);
  } else if (key === "↵") {
    game.guessWord();
  } else {
    game.guess += key;
  }
};
</script>

<style>
.keyboard-bg {
  flex-shrink: 0;
  background-color: var(--col-bg);
  border-top: 1px solid var(--col-primary);
}
.keyboard-cq {
  container-type: inline-size;
  width: min(100%, 40rem);
  margin: auto;
}
.keyboard {
  --button-bg: var(--col-primary);
  --col-cold: var(--button-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5cqi;
  padding: 2.5cqi;
}
.keyboard .row {
  display: flex;
  gap: 1.5cqi;
}
.keyboard button {
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8cqi;
  height: 10cqi;
  font-size: 5cqi;
  line-height: 1;
  padding: 0;
  padding-top: 0.33em;
  color: var(--col-bg);
  cursor: pointer;
  text-transform: uppercase;
  /* text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5); */
  font-variation-settings: "wdth" 90, "wght" 440;
  z-index: 1;
}
.keyboard button:before {
  content: "";
  position: absolute;
  inset: 0cqi;
  border-radius: 1.5cqi;
  z-index: -1;
  background-color: var(--button-bg);
  /* background: conic-gradient(red, green, red, green, red); */
  background: var(--keystyle, var(--button-bg));
  box-shadow: 0.5cqi 1cqi 0 var(--col-primary-25);
}
.keyboard button:after {
  content: "";
  position: absolute;
  inset: 1.5cqi;
  border-radius: 0.75cqi;
  z-index: -1;
  background-color: var(--button-bg);
}
.keyboard button:not([disabled]):active {
  transform: translateY(0.5cqi);
}
.keyboard button:not([disabled]):active:before {
  box-shadow: 0.5cqi 0.5cqi 0 var(--col-primary-25);
}
.keyboard button.icon {
  width: 12cqi;
  padding-top: 0;
}
.keyboard button[disabled] {
  /* opacity: 0.5; */
  --button-bg: var(--col-primary-50);
  --col-cold: var(--col-primary-50);
}
.keyboard svg {
  width: auto;
  height: 1em;
  fill: currentColor;
  /* filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.5)); */
}

.keyboard-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--col-bg-90);
  z-index: 1;
}
</style>
