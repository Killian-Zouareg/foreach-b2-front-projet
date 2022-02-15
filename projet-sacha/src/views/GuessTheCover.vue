<template>
<div>
 <v-btn
      color="blue-grey"
      class="ma-2 white--text"
      fab
      @click="generateCover"
    >
      <v-icon dark>
        mdi-album
      </v-icon>
    </v-btn>
    <v-img
        :lazy-src="song.albumArt" 
        max-height="500"
        object-fit="contain"
        max-width="500"
        width="50%"
        :src="song.albumArt"
    ></v-img>
    <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
          v-model="albumName"
            label="Name of the Album"
            @keyup.13="checkResult"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
          v-model="artistName"
            label="Name of the artist"
            @keyup.13="checkResult"
          ></v-text-field>
        </v-col>
      </v-row>
       <v-btn
      color="success"
      class="mr-4"
      @click="checkResult"
    >
      Validate
    </v-btn>
    </v-container>
  </v-form>
  <v-container>

    <p>
      Score : {{ `${actualScore}`}} / {{ `${maxScore}`}}
    </p>

    <v-btn @click="resetScore">
      RESET SCORE 
    </v-btn>

  </v-container>
</div>
</template>

<script>
import { generateCover } from '../apis/generateCover'
import { getLyrics, getSong , getSongById } from 'genius-lyrics-api';
import axios from 'axios';
import { INCREMENT_MAXSCORE, INCREMENT_ACTUALSCORE, RESET_SCORE } from '../store/mutation'
import { mapMutations, mapState } from 'vuex'



export default {
  name:'GuessTheCover',
  data() {
      return {
          artistName:'',
          albumName:'',
          result: {},
          random:0,
          song :{
          albumName :'',
        albumArt: '',	// URL of the album art image (jpg/png)
  }
      }
  },
  computed:{
    ...mapState({
      maxScore: 'maxScore',
      actualScore: 'actualScore'
    })
  },
  methods: {
      async generateCover(){
          const url = 'https://api.genius.com/songs/';
          const options = {
            apiKey: 'zN0Wcr2jF6nWf81eCXkxOTl-YOYCMBk6XveW8Rm9RT7AIOKC2snNBEPO-wS--O_7',
          };
          this.random = Math.floor(Math.random()* (999999 - 1) + 1)
          try{
          const res = await axios.get(`${url}${this.random}?access_token=${options.apiKey}`)
          this.song.albumArt =  res.data.response.song.album.cover_art_url
          this.song.albumName = res.data.response.song.album.name.replace(/ /g,"")
          this.song.artistName = res.data.response.song.artist_names.replace(/ /g,"")
          console.log(this.song.albumName);
          console.log(this.song.artistName) 
          }catch(e){
              this.generateCover()
          }    
      },
      async checkResult(){
        console.log("TEST BOUTON");
        if (this.albumName.replace(/ /g,"") === this.song.albumName || this.artistName.replace(/ /g,"") == this.song.artistName){
            console.log('Gagné');
            this.incrementActual()
            this.incrementMax()
            this.generateCover()
        }else {
            this.incrementMax()
            this.generateCover()
        }
      },
      resetScore(){
        this.resetScore()
      },
      ...mapMutations({
        incrementMax : INCREMENT_MAXSCORE,
        incrementActual: INCREMENT_ACTUALSCORE,
        resetScore: RESET_SCORE
      })
  }
}
</script>

<style>

</style>
