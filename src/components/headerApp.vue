<template>
    <v-app-bar color="rgb(53, 20, 220)">
        <v-spacer></v-spacer>
        <v-toolbar-title>
            <router-link to="/" exact >TopAnimes</router-link>
            <template v-if="!isAuthenticated">
                <router-link to="/Connexion" exact >Connexion</router-link>
            </template>
            <template v-else>
                <span class="user-info">
                    <router-link to="/Account" exact >
                    <v-icon class="white--text" style="font-size: 30px; margin-top :-4%">mdi-account</v-icon>
                    <span class="user-pseudo">{{ userDisplayName }}</span>
                    </router-link>
                </span>
            </template>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon class="white--text">mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon class="white--text">mdi-magnify</v-icon>
        </v-btn>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon class="white--text">mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                    <v-list-item-title>Option {{ n }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script scoped>
import { getAuth } from 'firebase/auth';

export default {
    data() {
        return {
            userDisplayName: '',
            user: null,
        };
    },
    computed: {
        isAuthenticated() {
            return this.user !== null;
        },
    },
    created() {
        const auth = getAuth();
        auth.onAuthStateChanged(user => {
            this.user = user;
            if (user) {
                this.userDisplayName = user.displayName;
            } else {
                this.userDisplayName = '';
            }
        });
    },
    methods: {
        redirectToAccount() {
            this.$router.push({ path: '/account' });
        },
        updatePseudo(newPseudo) {
            this.userDisplayName = newPseudo;
        }
    },
    mounted() {
        this.$root.$on('pseudoUpdated', this.updatePseudo);
    },
    beforeDestroy() {
        this.$root.$off('pseudoUpdated', this.updatePseudo);
    }
};
</script>

<style>
a {
    color: rgb(255, 255, 255) !important;;
    text-decoration: none;
    margin: 5px;
    padding: 12px;
    border-radius: 35%;
}
.router-link-active {
    color: rgb(0, 0, 0) !important;
    background: rgb(255, 255, 255);
    font-weight: bold;
}
.router-link-active .v-icon.v-icon {
    color: rgb(0, 0, 0) !important;
}
.user-pseudo {
    font-size: 0.85em;
}
.v-app-bar {
  max-height: 64px; /* Assurez-vous que la hauteur minimale est cohérente */
}
</style>
