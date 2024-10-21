import { defineStore } from 'pinia';

export const useRoutesStore = defineStore('routes', {
  state: () => ({
    menuOpen: false,
    menuTab: 'settings',
  }),
  getters: {
  },
  actions: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    setMenuTab(tab) {
      this.menuTab = tab;
    }
  },
});

