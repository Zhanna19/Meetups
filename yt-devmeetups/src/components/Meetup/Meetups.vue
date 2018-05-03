<template>
  <v-layout row wrap class="ml-5 mt-5">
    <v-flex xs12 sm3>
      <v-card>
        <v-card-media
          class="white--text"
          height="200px"
          src="https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200"
        >
        <v-container fill-height fluid>
          <v-layout row>
              <v-flex xs12 align-end flexbox>
                <span class="headline">New Your Meetup</span>
            </v-flex>
          </v-layout>
        </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h5 class="green--text mb-2">Number 10</h5>
            <h3>Whitehaven Beach</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat to="/meetups/1">
            <v-icon left light>arrow_forward</v-icon>
            Vue meetup
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
      name: 'Meetups'
    }
</script>

<style scoped>

</style>
