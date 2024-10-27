<template>
  <v-app>
    <app-header></app-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
// Imports
import HeaderApp from './components/headerApp.vue';

export default {
  components: {
      'app-header': HeaderApp
  },
  data () {
      return {
      }
  },
  methods: {
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Nunito SemiBold';
}
</style>
