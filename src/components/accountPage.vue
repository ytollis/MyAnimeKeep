<template>
    <v-container>
      <v-card class="user-account">
        <v-card-title>Compte Utilisateur</v-card-title>
        <v-card-text>
          <v-form ref="userForm" v-model="formValide">
            <!-- Afficher l'Email -->
            <v-text-field
              label="Email"
              v-model="email"
              :disabled="true"
              class="email-readonly"
            ></v-text-field>
  
            <!-- Afficher et Modifier le Pseudo -->
            <v-text-field
              label="Pseudo"
              v-model="pseudo"
              :disabled="!editionPseudo"
              @blur="mettreAJourPseudo"
            ></v-text-field>
            <v-btn class="btn-green" @click="editionPseudo = !editionPseudo">
              {{ editionPseudo ? "Enregistrer" : "Modifier le Pseudo" }}
            </v-btn>
  
            <!-- Mot de passe affiché ou édition -->
            <v-text-field
              v-if="!editionMotDePasse"
              label="Mot de passe"
              value="******"
              :disabled="true"
            ></v-text-field>
  
            <template v-else>
              <v-text-field class="password-field"
                label="Mot de passe actuel"
                v-model="motDePasseActuel"
                type="password"
              ></v-text-field>
              <v-text-field class="password-field"
                label="Nouveau mot de passe"
                v-model="nouveauMotDePasse"
                type="password"
              ></v-text-field>
            </template>
  
            <v-btn class="btn-green" @click="toggleMotDePasseEdition">
              {{ editionMotDePasse ? "Enregistrer" : "Modifier le Mot de Passe" }}
            </v-btn>
  
            <!-- Boutons Déconnexion et Supprimer le compte -->
            <v-row class="important-buttons">
              <v-col cols="6">
                <v-btn class="btn-orange" @click="deconnexion" block>
                  Déconnexion
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn class="btn-red" @click="openDialog" block>
                  Supprimer le compte
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
  
      <!-- Snackbar pour messages de confirmation ou d'erreur -->
      <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor">
        {{ snackbarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">OK</v-btn>
        </template>
      </v-snackbar>

      <!-- Boîte de dialogue de confirmation de suppression de compte -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Confirmer la suppression</v-card-title>
          <v-card-text>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Annuler</v-btn>
            <v-btn color="red" text @click="supprimerCompte">Confirmer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>
  
<script>
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  deleteUser,
  updateProfile,
} from "firebase/auth";

export default {
  data() {
    return {
      pseudo: "",
      email: "",
      motDePasseActuel: "",
      nouveauMotDePasse: "",
      editionPseudo: false,
      editionMotDePasse: false, // État pour l'édition du mot de passe
      formValide: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      dialog: false,
    };
  },
  mounted() {
    const user = getAuth().currentUser;
    if (user) {
      this.pseudo = user.displayName || "";
      this.email = user.email || "";
    }
  },
  methods: {
    async mettreAJourPseudo() {
      const user = getAuth().currentUser;
      if (user && this.pseudo) {
        try {
          await updateProfile(user, { displayName: this.pseudo });
          this.afficherSnackbar("Pseudo mis à jour avec succès !", "success");
          this.$root.$emit("pseudoUpdated", this.pseudo);
        } catch (error) {
          this.afficherSnackbar("Erreur lors de la mise à jour du pseudo", "error");
        }
      }
    },
    toggleMotDePasseEdition() {
      if (this.editionMotDePasse) {
        this.changerMotDePasse(); // Sauvegarder le mot de passe
      }
      this.editionMotDePasse = !this.editionMotDePasse;
    },
    async changerMotDePasse() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user && this.motDePasseActuel && this.nouveauMotDePasse) {
        try {
          const credential = EmailAuthProvider.credential(
            user.email,
            this.motDePasseActuel
          );
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, this.nouveauMotDePasse);
          this.afficherSnackbar("Mot de passe mis à jour avec succès !", "success");
          this.motDePasseActuel = "";
          this.nouveauMotDePasse = "";
        } catch (error) {
          this.afficherSnackbar("Erreur lors de la mise à jour du mot de passe", "error");
        }
      }
    },
    async deconnexion() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.$router.push("/Connexion");
        this.afficherSnackbar("Déconnexion réussie !", "success");
      } catch (error) {
        this.afficherSnackbar("Erreur lors de la déconnexion", "error");
      }
    },
    openDialog() {
      this.dialog = true;
    },
    async supprimerCompte() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          await deleteUser(user);
          this.dialog = false;
          alert("Compte supprimé avec succès.");
          this.$router.push('/'); // Rediriger vers la page d'accueil après la suppression
        } catch (error) {
          console.error("Erreur lors de la suppression du compte :", error);
          alert("Échec de la suppression du compte. Veuillez vous reconnecter pour valider l'action.");
        }
      }
    },
    afficherSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.user-account {
  max-width: 500px;
  margin: auto;
}
.v-text-field {
  margin-top: 32px;
}
.v-btn {
  margin-bottom: 32px;
}
.password-field {
  margin-top: 1px;
}
.important-buttons {
  margin-top: 32px;
}
.btn-green {
  background-color: rgb(2, 154, 2) !important;
  color: white !important;
}
.btn-orange {
  background-color: orange !important;
  color: white !important;
}
.btn-red {
  background-color: red !important;
  color: white !important;
}
</style>
