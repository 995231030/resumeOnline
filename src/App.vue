<template>
  <router-view></router-view>
</template>

<script>
import './assets/css/base.css'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'App',
  useRoute: useRoute,
  useRouter: useRouter
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
