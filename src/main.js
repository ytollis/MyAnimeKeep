import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Routes from "./routes";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuetify);

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGAyFUAaVmIiBGMrP60M1mw3mxX0uYzoc",
  authDomain: "nn-vue-playlist-881e4.firebaseapp.com",
  projectId: "nn-vue-playlist-881e4",
  storageBucket: "nn-vue-playlist-881e4.appspot.com",
  messagingSenderId: "754366905681",
  appId: "1:754366905681:web:b1b8d28969bbf9b5d36770",
};

// Initialiser Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Initialiser le routeur
const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

Vue.config.productionTip = false;

// Créer l'application Vue seulement après l'authentification
let app;
onAuthStateChanged(auth, () => {
  if (!app) {
    app = new Vue({
      router,
      vuetify: new Vuetify(),
      render: (h) => h(App),
    }).$mount("#app");
  }
});
