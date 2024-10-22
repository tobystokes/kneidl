<template>
  <aside class="menu-panel" id="menu-panel" v-if="routes.menuOpen">
    <nav class="tabs">
      <button
        v-for="(tab, tabId) in tabs"
        :key="tabId"
        :id="`tab-${tabId}`"
        type="button"
        role="tab"
        :aria-selected="tabId === routes.menuTab"
        :aria-controls="`tabpanel-${tabId}`"
        @click="routes.menuTab = tabId"
      >
        {{ tab.label }}
      </button>
    </nav>
    <component
      :is="tabs[routes.menuTab].component"
      role="tabpanel"
      class="tabpanel"
      tabindex="0"
      :id="`tabpanel-${routes.menuTab}`"
      :aria-labelledby="`tab-${routes.menuTab}`"
    />
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useRoutesStore } from "@/stores/routes";
import SettingsPanel from "@/components/SettingsPanel.vue";
import StatsPanel from "@/components/StatsPanel.vue";
import AboutPanel from "@/components/AboutPanel.vue";
const routes = useRoutesStore();
const tabs = {
  settings: { label: "Settings", component: SettingsPanel },
  stats: { label: "Stats", component: StatsPanel },
  about: { label: "About", component: AboutPanel },
};
</script>

<style>
.menu-panel {
  color: var(--col-primary);
  background-color: var(--col-bg);
  width: 100%;
  max-width: var(--container-width);
  margin-inline: auto;
}
.menu-panel .tabs {
  display: flex;
  /* width: 100%;
  justify-content: stretch; */
}

.menu-panel .tabs button {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: var(--gutter);
  color: var(--col-primary);
  padding-block: calc(var(--gutter) * 1.5);
  border-bottom: 1px solid var(--col-primary-50);
  font-size: 1.5em;
  font-variation-settings: "wdth" 80, "wght" 500;
}
.menu-panel .tabs button[aria-selected="true"] {
  border-bottom: 0.25rem solid var(--col-primary);
}

.tabpanel {
  padding: var(--gutter);
}
</style>
