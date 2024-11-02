<template>
    <v-container>
        <h1>Search for any anime</h1>
        <v-toolbar dense floating class="navbar">
            <v-text-field
                v-model="search"
                hide-details
                prepend-icon="mdi-magnify"
                single-line
                placeholder="type 3 letters or more to see the results"
                clearable
            ></v-text-field>
        </v-toolbar>
<!--         <div v-for="anime in animesFound" :key="anime.node.id" class="single-blog">
            <h2>{{ anime.node.title }}</h2>
            <p>{{ anime.node.synopsis }}</p>
        </div> -->
        <anime-grid :animes="animesFound"></anime-grid>
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
            blogs: [],
            animesFound:[],
            search: ''
        }
    },
    watch: {
        search: 'searchAnime'
    },
    methods: {
        async searchAnime() {
            if (this.search.length <3) {
                this.animesFound = [];
                return;
            }

            try {
                const response = await this.$http.get(`http://localhost:3000/api/anime/search?q=${this.search}`);
                this.animesFound = response.body.data;
            } catch (error) {
                console.error("Erreur lors de la recherche d'anime:", error);
            }
        }
    },

    mixins: [searchMixin]
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 100px;
}

.navbar {
  display: flex;
  margin-bottom:1%;
}

.v-text-field{
    width:300px;
}
</style>