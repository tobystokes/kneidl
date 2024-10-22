<template>
  <div>
    <div class="stat-blocks">
      <div class="stat-block">
        <h3>Games played</h3>
        <p class="u-caps">{{ totalGamesPlayed }}</p>
      </div>
      <div class="stat-block">
        <h3>Win rate</h3>
        <p class="u-caps">{{ totalWinRate }}<span class="percent">%</span></p>
      </div>
    </div>

    <table class="barchart">
      <thead>
        <tr>
          <th>Guesses remaining</th>
          <th>Games played</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, count] in scoreOrder">
          <td>
            <span class="u-caps">{{ key == -1 ? "lost" : key }}</span>
          </td>
          <td class="meter-cell">
            <div class="meter" :style="{ '--meter-width': meterWidth(count) }">
              <span class="u-caps" :data-count="count || 0">{{
                count || 0
              }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "@/stores/game";
const game = useGameStore();

const totalGamesPlayed = computed(() =>
  Object.values(game.stats)
    .flatMap((boardLength) => Object.values(boardLength))
    .reduce((acc, val) => acc + val)
);

const totalWinRate = computed(() => {
  const losses = Object.values(game.stats)
    .flatMap((boardLength) => boardLength["-1"] || 0)
    .reduce((acc, val) => acc + val);
  return Math.round(
    ((totalGamesPlayed.value - losses) * 100) / totalGamesPlayed.value
  );
});

const combinedStats = computed(() => {
  const merged = {};
  Object.values(game.stats).forEach((boardLength) => {
    Object.entries(boardLength).reduce((acc, [key, val]) => {
      acc[key] = (acc[key] || 0) + val;
      return acc;
    }, merged);
  });
  return merged;
});

const scoreRange = Array.from({ length: 7 }, (v, i) => i - 1).reverse();

const scoreOrder = computed(() => {
  const sortedStats = new Map(); // numeric keys, using an object would sort them as strings
  scoreRange.forEach((key) => {
    sortedStats.set(key, combinedStats.value[key]);
  });
  return sortedStats;
});

const longestBar = computed(() => {
  const max = Math.max(...Object.values(combinedStats.value));
  return max;
});
const meterWidth = (count) => `${((count ?? 0) / longestBar.value) * 100}%`;
</script>

<style>
.barchart {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75em;
  line-height: 1;
  font-variation-settings: "wdth" 100, "wght" 400;
}
.barchart th,
.barchart td {
  padding: 0.25rem;
  vertical-align: center;
  width: 50%;
}
.barchart th:first-child,
.barchart td:first-child {
  text-align: right;
}
.barchart th:last-child,
.barchart td:last-child {
  text-align: left;
  border-left: 2px solid var(--col-primary);
}
.barchart .meter-cell {
  padding: 0;
}
.meter {
  position: relative;
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  padding: 0.25rem;
}
.meter:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--meter-width);
  height: 100%;
  background-color: var(--col-primary);
}
.meter span {
  /* padding-left: var(--meter-width); */
  color: var(--col-bg);
  z-index: 1;
}
.meter [data-count="0"] {
  color: var(--col-primary);
}

.stat-blocks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin-block: var(--gutter);
}

.stat-block {
  padding: 1rem;
  padding-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--col-primary);
  color: var(--col-bg);
  border-radius: 0.25rem;
}

.stat-block h3 {
  font-size: 0.75em;
  line-height: 1;
  font-variation-settings: "wdth" 100, "wght" 400;
  letter-spacing: 0.03em;
}

.stat-block p {
  font-size: 3.75rem;
  font-variation-settings: "wdth" 60, "wght" 700;
  text-shadow: var(--letter-shadow);
}
.stat-block .percent {
  font-variation-settings: "wdth" 60, "wght" 350;
}
</style>
