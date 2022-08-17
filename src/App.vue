<template>
  <router-view></router-view>
</template>

<script>
import './assets/css/base.css'
import './assets/css/animate.min.css'

import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'App',
  useRoute: useRoute,
  useRouter: useRouter
}
</script>

<style>
body {
  overflow: hidden;
}
</style>
