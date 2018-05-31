<template>
  <v-container>
    <v-layout row>
      <v-flex x12 offset-sm2>
        <h2 class="primary--text">Create a new meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex x12>
        <v-form @submit.prevent="onCreateMeetup">
          <v-layout>
            <v-flex xs12 sm6 offset-sm2>
              <v-text-field
                v-model="title"
                label="Title"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="location"
                label="Location"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="imageUrl"
                label="Image URL"
                required
              >
              </v-text-field>
              <v-flex x12 sm6>
                <img :src="imageUrl" height="150">
              </v-flex>
              <v-text-field
                v-model="description"
                label="Description"
                multi-line
                required
              >
              </v-text-field>
              <v-flex xs12 sm12 offset-sm-3 mb-2>
                <h4>Choose a Date & Time</h4>
                <v-date-picker v-model="date"></v-date-picker>
              </v-flex>
              <v-flex xs12 sm12 offset-sm-3>
                <v-time-picker v-model="time" format="24hr"></v-time-picker>
              </v-flex>
              <v-btn
                class="primary"
                :disabled="!formValid"
                type="submit"
              >
                CREATE MEETUP
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: 'CreateMeetup',
      data () {
        return {
          title: '',
          location: '',
          imageUrl: '',
          description: '',
          date: '',
          time: null
        }
      },
      computed: {
        formValid () {
          return this.title !== '' &&
            this.location !== '' &&
            this.imageUrl !== '' &&
            this.description !== ''
        },
        submittableDateTme () {
          let date = new Date(this.date)
          if (typeof this.time === 'string') {
            let hours = this.time.match(/^(\d+)/)[1]
            let minutes = this.time.match(/:(\d+)/)[1]
            date.setHours(hours)
            date.setMinutes(minutes)
          } else {
            date.setHours(this.time.getHours())
            date.setMinutes(this.time.getMinutes())
          }
          return date
        }
      },
      methods: {
        onCreateMeetup () {
          if (!this.formValid) {
            return
          }
          let meetupData = {
            title: this.title,
            location: this.location,
            imageUrl: this.imageUrl,
            description: this.description,
            date: this.submittableDateTme
          }
          this.$store.dispatch('createMeetup', meetupData)
          this.$router.push('/meetups')
        }
      }
    }
</script>

<style scoped>

</style>
