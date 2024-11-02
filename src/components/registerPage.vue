<template>
  <v-container class="fill-height justify-center">
    <v-card class="pa-4">
      <v-card-title class="headline">Inscription</v-card-title>
      <v-card-text>
        <div v-if="showConfirmation">
          <p>Votre compte a été créé avec succès !</p>
          <p>Un email de confirmation a été envoyé à {{ email }}. Veuillez vérifier votre boîte de réception et cliquer sur
            le lien pour compléter la création de votre compte.</p>
        </div>
        <v-form v-else ref="registerForm" v-model="isValid">
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
          <v-text-field
            label="Pseudo"
            v-model="pseudo"
            :rules="[v => !!v || 'Pseudo requis']"
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
      <v-card-actions v-if="!showConfirmation">
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
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      pseudo: '',
      error: null,
      isValid: false,
      showPassword: false,
      showConfirmation: false, // Nouveau état pour afficher la confirmation
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
  async register() {
      this.error = null;
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Mettre à jour le profil avec le pseudo
        await updateProfile(user, {
          displayName: this.pseudo
        });

        this.$root.$emit('pseudoUpdated', this.pseudo);

        // Envoyer un email de vérification
        await sendEmailVerification(user);

        this.showConfirmation = true;

        //this.$router.push('/Connexion');
        
        // Afficher un message à l'utilisateur
        //alert('Un email de confirmation a été envoyé. Veuillez vérifier votre boîte mail et vous reconnecter.');

      } catch (err) {
        this.error = 'Échec de l\'inscription : ' + err.message;
      }
    }
  }
};
</script>

<style scoped>
</style>
