<template>
  <div></div>
</template>

<script setup></script>

<style>
input {
  --c: var(--col-primary); /* active color */
  --g: 0.125em; /* the gap */
  --l: 0.25em; /* line thickness*/
  --s: 1em; /* thumb size*/

  width: 100%;
  height: var(--s); /* needed for Firefox*/
  --_c: color-mix(in srgb, var(--c), #000 var(--p, 0%));
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  cursor: pointer;
  overflow: hidden;
}
input:focus-visible,
input:hover {
  --p: 25%;
}
input:active,
input:focus-visible {
  --_b: var(--s);
}
/* chromium */
input[type="range" i]::-webkit-slider-thumb {
  height: var(--s);
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 0 0 0 var(--_b, var(--l)) inset var(--_c);
  border-image: linear-gradient(90deg, var(--_c) 50%, #ababab 0) 0 1 /
    calc(50% - var(--l) / 2) 100vw/0 calc(100vw + var(--g));
  -webkit-appearance: none;
  appearance: none;
  transition: 0.3s;
}
/* Firefox */
input[type="range"]::-moz-range-thumb {
  height: var(--s);
  width: var(--s);
  background: none;
  border-radius: 50%;
  box-shadow: 0 0 0 var(--_b, var(--l)) inset var(--_c);
  border-image: linear-gradient(90deg, var(--_c) 50%, #ababab 0) 0 1 /
    calc(50% - var(--l) / 2) 100vw/0 calc(100vw + var(--g));
  -moz-appearance: none;
  appearance: none;
  transition: 0.3s;
}
@supports not (color: color-mix(in srgb, red, red)) {
  input {
    --_c: var(--c);
  }
}
</style>
