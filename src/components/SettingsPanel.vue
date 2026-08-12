<template>
  <div>
    <p>There aren’t any settings yet.</p>
    <h4>Debug</h4>
    <code>{{ commitSha }}</code>
  </div>
</template>

<script setup>
const commitSha = __VERCEL_GIT_COMMIT_SHA__?.substring(0, 8);
</script>

<style></style>
