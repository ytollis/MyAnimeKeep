<template>
    <v-container class="d-flex justify-center">
      <v-card class="pa-4" max-width="400">
        <v-card-title class="headline">Inscription</v-card-title>
        <v-card-text>
          <v-form ref="registerForm" v-model="isValid">
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
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!isValid"
            color="primary"
            @click="register"
          >
            S'inscrire
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
</template>
 
  <script>
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
 
  export default {
    data() {
      return {
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
      register() {
        this.error = null;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => {
            this.error = 'Échec de l’inscription : ' + err.message;
          });
      }
    }
  };
  </script>
 
  <style scoped>
  .v-container {
    min-height: 100vh;
    align-items: center;
  }
  </style>