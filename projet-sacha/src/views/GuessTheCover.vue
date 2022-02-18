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
    &#8592; Generate a cover
    <v-img
        :lazy-src="song.albumArt" 
        max-height="500"
        object-fit="contain"
        max-width="500"
        width="50%"
        :src="song.albumArt"
        id="image"
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
      :disabled="!isCover"
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

  <v-container >
    <div id="flex">
    <v-icon v-show="fail" size="500px" id="fail">
      mdi-alpha-x-circle-outline
    </v-icon>
    </div>
  </v-container>
  <v-container >
    <div id="flex">
    <v-icon v-show="success" size="500px" id="success">
      mdi-thumb-up
    </v-icon>
    </div>
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
          isCover: false,
          fail:false,
          success: false,
          artistName:'',
          albumName:'',
          result: {},
          song :{
          artistName:'',
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

      // Function to generate an album cover
      async generateCover(){
          const url = 'https://api.genius.com/songs/';
          const options = {
            apiKey: 'zN0Wcr2jF6nWf81eCXkxOTl-YOYCMBk6XveW8Rm9RT7AIOKC2snNBEPO-wS--O_7',
          };
          let random = Math.floor(Math.random()* (10000000 - 1) + 1)
          try{
          const res = await axios.get(`${url}${random}?access_token=${options.apiKey}`)
          this.song.albumArt =  res.data.response.song.album.cover_art_url
          this.song.albumName = res.data.response.song.album.name.replace(/ /g,"").toLowerCase()
          this.song.artistName = res.data.response.song.artist_names.replace(/ /g,"").toLowerCase()
          this.isCover = true
          console.log(this.song.albumName)
          console.log(this.song.artistName)
          }catch(e){
              this.generateCover()
          }    
      },

      // Function to check the result from the user
      async checkResult(){
        console.log("TEST BOUTON");
        if (this.albumName.replace(/ /g,"").toLowerCase() === this.song.albumName || this.artistName.replace(/ /g,"").toLowerCase() == this.song.artistName){
            console.log('Gagné');
            this.incrementActual()
            this.incrementMax()
            this.albumName = ""
            this.artistName =""
            this.generateCover()
            this.success = true
            setTimeout(() => {
              this.success = false
            }, 1500)
        }else {
            this.fail = true
            setTimeout(() => {
              this.fail = false
            }, 1500)
            this.incrementMax()
            this.albumName = ""
            this.artistName = ""
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

#fail{
  color: red;
  position: absolute;
  justify-content: center;
  top: 25%;
  left: 35%;
  animation-duration: 2s;
  animation-name: shake;
}

#success{
  color: greenyellow;
  position: absolute;
  justify-content: center;
  top: 25%;
  left: 35%;
}

#flex {
    display: flex;
}

#image{
  left: 25%;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>
