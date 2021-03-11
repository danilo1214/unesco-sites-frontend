<template>
  <div id="app">
    <navbar />

    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: { Navbar },
  name: 'App',
  
}
</script>

<style>
#app {
  font-family: sans-serif;
}
</style>
