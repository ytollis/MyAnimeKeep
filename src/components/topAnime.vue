<template>
    <v-container>
      <h1 class="text-center">Top 100 des animes (MyAnimeList)</h1>
      <v-row>
        <v-col
          v-for="anime in topAnime"
          :key="anime.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-img
              :src="anime.node.main_picture.medium"
              height="350"
              contain
            ></v-img>
            <v-card-text style="min-height: 80px;">
              <span class="anime-title">{{ anime.node.title }}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
// Imports
//import searchMixin from '../mixins/searchMixin';

export default {
    data () {
        return {
            topAnime: [],
            search: ''
        }
    },
    created() {
        this.$http.get('http://localhost:3000/api/anime/ranking?ranking_type=all&limit=100')
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
    //mixins: [searchMixin]
}
</script>

<style>
h1 {
  text-align: center;
  margin-bottom: 100px;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  grid-template-rows: repeat(5, auto); /* 5 lignes */
  gap: 20px; /* Espacement entre les items */
}

.anime-item {
  text-align: center; /* Centre le texte sous l'image */
}

img {
  width: 250px; /* Définit une largeur fixe */
  height: 350px; /* Définit une hauteur fixe */
  object-fit: cover; /* Remplit le conteneur sans déformer l'image */
}

.anime-title {
  display: block; /* S'assure que le titre prend toute la largeur */
  margin-top: 5px; /* Espacement entre l'image et le titre */
}

.anime-title {
  text-align: center; /* Centrer le texte */
  font-size: 20px;
  font-weight: bold;
  color: rgb(79, 76, 76);
}
</style>