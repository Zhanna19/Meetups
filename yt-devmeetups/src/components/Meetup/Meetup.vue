<template>
    <v-container>
      <v-layout row wrap v-if="loading">
        <v-flex x12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
            v-if="loading"
          >
          </v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs12 >
          <v-card>
            <v-card-title>
              <h4 class="primary--text">{{meetup.title}}</h4>
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <edit-meetup-dialoge :meetup="meetup"></edit-meetup-dialoge>
              </template>
            </v-card-title>
            <v-card-media
              class="white--text"
              height="400px"
              :src="meetup.imageUrl"
            >
              <v-container fill-height fluid>
                <v-layout row>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">New Your Meetup</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-text>
              <div class="info--text">{{meetup.date | date}} - {{meetup.location}}</div>
              <div>
                <edit-meetup-date :meetup="meetup" v-if="userIsCreator"></edit-meetup-date>
                <edit-meetup-time :meetup="meetup" v-if="userIsCreator"></edit-meetup-time>
              </div>
              <div>{{meetup.description}}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="blue--text" @click="download">Download information</v-btn>
              <app-register :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-register>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import JSPdf from 'jsPDF'
  export default {
    name: 'Meetup',
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      download () {
        let doc = new JSPdf()
        let date = new Date(this.meetup.date)
        doc.text(this.meetup.title, 10, 10)
        doc.text(date.toString(), 10, 20)
        doc.text(this.meetup.description, 10, 30)
        doc.save(this.meetup.title + '.pdf')
      }
    }
  }
</script>

<style scoped>

</style>
