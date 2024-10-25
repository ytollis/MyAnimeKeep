import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "nn-vue-playlist-881e4.firebaseapp.com",
  projectId: "nn-vue-playlist-881e4",
  storageBucket: "nn-vue-playlist-881e4.appspot.com",
  messagingSenderId: "754366905681",
  appId: "1:754366905681:web:b1b8d28969bbf9b5d36770",
};

// Initialiser Firebase
console.log("API Key:", process.env.VUE_APP_API_KEY);
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
