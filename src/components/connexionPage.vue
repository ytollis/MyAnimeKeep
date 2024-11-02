<template>
    <v-container class="fill-height justify-center">
      <v-alert v-if="message" type="info">{{ message }}</v-alert>
      <v-card class="pa-4">
        <v-card-title class="headline">Connexion</v-card-title>
        <v-card-text>
          <v-form ref="loginForm" v-model="isValid">
            <v-text-field
              label="Email"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
 
            <v-text-field
              label="Mot de passe"
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              append-icon="mdi-eye"
              @click:append="togglePasswordVisibility"
              required
            ></v-text-field>
          </v-form>
          <v-alert
            v-if="error"
            type="error"
            dismissible
            class="mt-2"
          >
            {{ error }}
          </v-alert>
          <p>Pas encore de compte ?
            <router-link to="/register">Inscrivez-vous ici</router-link>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!isValid"
            color="primary"
            @click="login"
          >
            Connexion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
</template>
 
  <script>
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
 
  export default {
    data() {
      return {
        message: this.$route.query.message || '',
        email: '',
        password: '',
        error: null,
        isValid: false,
        showPassword: false,
        emailRules: [
          v => !!v || 'Email requis',
          v => /.+@.+\..+/.test(v) || 'Adresse email invalide'
        ],
        passwordRules: [
          v => !!v || 'Mot de passe requis',
          v => v.length >= 6 || 'Mot de passe doit contenir au moins 6 caractères'
        ],
      };
    },
    methods: {
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      async login() {
        this.error = null;
        const auth = getAuth();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;

          // Vérifier si l'email est vérifié
          if (!user.emailVerified) {
            throw new Error('Votre email n\'est pas vérifié. Veuillez vérifier votre boîte mail.');
          }

          // Rediriger vers la page d'accueil
          this.$router.push('/');
        } catch (err) {
          // Afficher les messages d'erreur appropriés
          this.error = err.message === 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).'
            ? 'Identifiants invalides.'
            : err.message;
        }
      }
    }
  };
  </script>
 
  <style scoped>
  </style>