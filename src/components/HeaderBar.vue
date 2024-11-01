<template>
  <header>
    <h1 class="u-caps">KNEIDLE</h1>
    <button
      class="menu-icon"
      @click="routes.toggleMenu"
      :aria-expanded="routes.menuOpen ? true : undefined"
      aria-controls="menu-panel"
    >
      <component :is="menuIcon" />
    </button>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoutesStore } from "@/stores/routes";

import IconCloseMenu from "@/components/IconCloseMenu.vue";
import IconOpenMenu from "@/components/IconOpenMenu.vue";

const routes = useRoutesStore();

const menuIcon = computed(() =>
  routes.menuOpen ? IconCloseMenu : IconOpenMenu
);
</script>

<style>
header {
  height: var(--header-height);
  background-color: var(--col-primary);
  color: var(--col-bg);
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
}

header h1 {
  font-size: 2.5em;
  line-height: 1;
  font-variation-settings: "wdth" 60, "wght" 800;
  margin: 0;
}
.menu-icon {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: var(--header-height);
  height: var(--header-height);
  display: flex;
  color: var(--col-bg);
}
.menu-icon:hover,
.menu-icon:active,
.menu-icon:focus-visible,
.menu-icon[aria-expanded] {
  background-color: var(--col-bg);
  color: var(--col-primary);
}
.menu-icon svg {
  aspect-ratio: 1;
  width: var(--header-height);
  height: var(--header-height);
}
</style>
