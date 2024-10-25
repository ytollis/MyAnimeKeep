<template>
  <div>
      <app-header></app-header>
      <router-view></router-view>
  </div>
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
body{
  margin: 0;
  font-family: 'Nunito SemiBold';
}
</style>