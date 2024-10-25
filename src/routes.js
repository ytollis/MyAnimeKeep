import ConnexionPage from "./components/connexionPage.vue";
import RegisterPage from "./components/registerPage.vue";
import TopAnime from "./components/topAnime.vue";

export default [
  { path: "/", component: TopAnime },
  { path: "/Connexion", component: ConnexionPage },
  { path: "/Register", component: RegisterPage },
];