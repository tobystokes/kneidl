<template>
  <div class="keyboard-bg">
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
            angle = angle * (index + 1) + "deg";
          } else if (index == arr.length - 1) {
            angle = angle * index + "deg";
          } else {
            angle = angle * index + "deg " + angle * (index + 1) + "deg";
          }

          return `var(--col-${state}) ${angle}`;
        })
        .join(",");
      keystyle[key] = {
        "--keystyle": `conic-gradient(${angles})`,
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 1rem;
  background-color: var(--col-bg);
  /* stop Safari iOS zoom */
  touch-action: none;
  user-select: none;
}
.keyboard-cq {
  container-type: inline-size;
  width: min(100%, 40rem);
  margin: auto;
}
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5cqi;
}
.keyboard .row {
  display: flex;
  gap: 2.5cqi;
}
.keyboard button {
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8cqi;
  height: 11cqi;
  font-size: 5cqi;
  line-height: 1;
  padding: 0;
  padding-top: 0.33em;
  border: none;
  color: var(--col-primary);
  background-color: var(--col-bg-light);
  background-clip: padding-box;
  border: solid transparent 0.75cqi;
  border-radius: 1.5cqi;
  cursor: pointer;
  text-transform: uppercase;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  font-variation-settings: "wdth" 90, "wght" 440;
}
.keyboard button:before {
  content: "";
  position: absolute;
  inset: -0.75cqi;
  border-radius: 1.5cqi;
  z-index: -1;
  background-color: var(--col-bg-light);
  /* background: conic-gradient(red, green, red, green, red); */
  background: var(--keystyle, var(--col-bg-light));
  box-shadow: 0.5cqi 1cqi 0 rgba(0, 0, 0, 0.1);
}
.keyboard button:not([disabled]):active:before {
  transform: translateY(0.5cqi);
  box-shadow: 0.5cqi 0.5cqi 0 rgba(0, 0, 0, 0.1);
}
.keyboard button.icon {
  width: 12cqi;
  padding-top: 0;
}
.keyboard button[disabled] {
  opacity: 0.5;
}
.keyboard svg {
  width: auto;
  height: 1em;
  filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.5));
}
</style>
