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
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
          v-model="artistName"
            label="Name of the artist"
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
        this.song.albumArt = res.data.response.song.album.cover_art_url
        this.song.albumName = res.data.response.song.album.name
        console.log(res.data.response.song.album.name);
        }catch(e){
            generateCover()
        }    
    },
    async checkResult(){
      console.log("TEST BOUTON");
       if (this.albumName === this.song.albumName){
           console.log('Gagné');
       }
    }
}
}
</script>

<style>

</style>
