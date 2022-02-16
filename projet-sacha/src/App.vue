<template>
  <v-app>
    <v-app-bar app color="grey" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Genius Game Logo"
          class="shrink mr-2"
          contain
          src="https://pbs.twimg.com/profile_images/1035723269989650433/ucuo7VTh_400x400.jpg"
          transition="scale-transition"
          width="40"
        />

        <p alt="Vuetify Name" min-width="100" width="100">Genius Game</p>
      </div>

      <v-btn depressed color="yellow" class="black--text"
            href="/GuessTheCover"> Guess by cover </v-btn>

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
