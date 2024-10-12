<template>
  <div class="modal-bg"></div>
  <div class="modal">
    <button class="close" type="button" aria-label="close">x</button>
    <slot></slot>
  </div>
</template>

<script setup></script>

<style>
.modal {
  position: absolute;
  top: var(--header-height);
  /* left: 0; */
  width: 100%;
  max-width: 48rem;
  margin-inline: auto;
  background-color: var(--col-bg-light);
  color: var(--col-text);
  padding: 2rem;
  z-index: 2;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.12);
}

.modal-bg {
  content: "";
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background-color: color-mix(in srgb, var(--col-text) 25%, transparent);
}

.modal .close {
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-variation-settings: "wdth" 200, "wght" 250;
  background: transparent;
  border: 0;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}
</style>
