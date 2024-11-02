<template>
    <v-row>
        <v-col
          v-for="anime in animes"
          :key="anime.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="anime-card">
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
</template>

<script>
export default {
    props: {
        animes: {
            type: Array,
            required: true
        }
    }
}
</script>


<style scoped>
.anime-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  grid-template-rows: repeat(5, auto); /* 5 lignes */
  gap: 20px; /* Espacement entre les items */
}

img {
  width: 250px; /* Définit une largeur fixe */
  height: 350px; /* Définit une hauteur fixe */
  object-fit: cover; /* Remplit le conteneur sans déformer l'image */
}

.anime-title {
  display: block; /* S'assure que le titre prend toute la largeur */
  margin-top: 5px; /* Espacement entre l'image et le titre */
  text-align: center; /* Centrer le texte */
  font-size: 16px;
  font-weight: bold;
  color: rgb(79, 76, 76);
}

.anime-card {
  display: flex;
  flex-direction: column; /* Permet de centrer le contenu verticalement */
  height: 450px; /* Hauteur fixe pour uniformiser */
}
</style>