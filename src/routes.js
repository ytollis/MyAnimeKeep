import AccountPage from "./components/accountPage.vue";
import ConnexionPage from "./components/connexionPage.vue";
import RegisterPage from "./components/registerPage.vue";
import TopAnime from "./components/topAnime.vue";
import SearchAnime from "./components/searchAnime.vue";

export default [
  { path: "/", component: TopAnime },
  { path: "/Connexion", component: ConnexionPage },
  { path: "/Register", component: RegisterPage },
  { path: "/Account", component: AccountPage, meta: { requiresAuth: true } },
  { path: "/SearchAnime", component: SearchAnime },
];
