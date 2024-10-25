<template>
    <v-app-bar color="rgb(53, 20, 220)" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title class="white--text">
            <router-link to="/" exact class="white--text">TopAnimes</router-link>
            <router-link to="/Connexion" exact class="white--text">Connexion</router-link>
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


<style scoped>
ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
}
li{
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 12px;
    border-radius: 5px;
}
nav{
    background: rgb(39, 13, 168);
    padding: 30px 0;
    margin-bottom: 40px;
}
.router-link-active{
    color: rgb(39, 13, 168);
    background: rgb(255,255,255);
    border-radius: 35%;
}
</style>