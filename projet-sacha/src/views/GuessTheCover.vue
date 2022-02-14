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
      Score : {{score.actualScore}} / {{score.maxScore}}
    </p>

  </v-container>
</div>
</template>

<script>
import { generateCover } from '../apis/generateCover'
import { getLyrics, getSong , getSongById } from 'genius-lyrics-api';
import axios from 'axios';


export default {
name:'GuessTheCover',
data() {
    return {
        score: {
          maxScore:0,
          actualScore:0
        },
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
           this.score.actualScore += 1
           this.score.maxScore += 1
           this.generateCover()
       }else {
         this.score.maxScore += 1
          this.generateCover()
       }
    }
}
}
</script>

<style>

</style>
