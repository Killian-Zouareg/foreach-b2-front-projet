<template>
  <v-app>
    <v-app-bar app color="grey" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Genius Game Logo"
            class="shrink mr-2"
            contain
            src="https://camo.githubusercontent.com/2f1afecef9033d21cc42b61763e9de2f28dcebfde75576d317c9dce72eb5c592/68747470733a2f2f696d616765732e67656e6975732e636f6d2f38656436363963616464393536343433653239633730333631656334663337322e31303030783130303078312e706e67"
            transition="scale-transition"
            width="40" 
          />
        </router-link>
      </div>

      <v-btn depressed color="yellow" class="black--text"
            href="/GuessTheCover" id="lien"> Guess by cover </v-btn>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

<style scoped>

#lien{
  left: 1%;
}

</style>
