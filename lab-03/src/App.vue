<script setup lang="ts">
import Users from './components/Users.vue'
</script>

<template>
  <main class="app-main">
    <Users />
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f1f5f9;
}

.app-main {
  min-height: 100vh;
  padding: 20px 0;
}
</style>
