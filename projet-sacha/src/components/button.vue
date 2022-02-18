<template>
    <div>
        <v-button @click="checkresult">
            VALIDATE
        </v-button>
    </div>
</template>

<script>
export default {
    name:'button',
    methods: {
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
      }
    }

}
</script>

<style>

</style>