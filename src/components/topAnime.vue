<template>
    <v-container>
      <h1 class="text-center">Top 100 most popular animes (from MyAnimeList)</h1>
      <v-toolbar dense floating>
            <v-text-field
                v-model="search"
                hide-details
                prepend-icon="mdi-magnify"
                single-line
                placeholder="filter by name"
                clearable
            ></v-text-field>
      </v-toolbar>
      <anime-grid :animes="filteredAnimes"></anime-grid>
    </v-container>
</template>

<script>
// Imports
import searchMixin from '../mixins/searchMixin';
import AnimeGrid from './animeGrid.vue';

export default {
    components: {
        'anime-grid': AnimeGrid
    },
    data () {
        return {
            topAnime: [],
            search: ''
        }
    },
    created() {
        this.$http.get('http://localhost:3000/api/anime/ranking?')
        /* this.$http.get('http://localhost:3000/api/anime/ranking?ranking_type=all&limit=20', {
          headers: {'X-MAL-CLIENT-ID': 'a69dcdb8bf3f3a8f73d5c3eb07737c8c'}
        }) */
        .then(function (response) {
          this.topAnime = response.body.data;
          console.log(this.topAnime)
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    mixins: [searchMixin]
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 100px;
}
</style>