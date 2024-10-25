<template>
  <div>
      <header-app></header-app>
      <router-view></router-view>
  </div>
</template>

<script>

// Imports
import HeaderApp from './components/headerApp.vue';

export default {
   components: {
      'header-app': HeaderApp
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
body{
  margin: 0;
  font-family: 'Nunito SemiBold';
}
</style>