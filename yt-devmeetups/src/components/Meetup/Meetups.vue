<template>
  <v-layout row wrap class="ml-5 mt-5">
    <v-flex xs12 sm3 v-for="meetup in meetups" :key="meetup.id" >
      <v-card class="ml-2">
        <v-card-media
          class="white--text"
          height="200px"
          :src="meetup.imageUrl"
        >
        <v-container fill-height fluid>
          <v-layout row>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{meetup.title}}</span>
            </v-flex>
          </v-layout>
        </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h5 class="green--text mb-2">{{meetup.date | date}}</h5>
            <h3>{{meetup.title}}</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat :to="'/meetups/' + meetup.id">
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
      name: 'Meetups',
      computed: {
        meetups () {
          return this.$store.getters.loadedMeetups
        }
      }
    }
</script>

<style scoped>

</style>
