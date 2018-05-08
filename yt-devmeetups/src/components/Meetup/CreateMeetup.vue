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
          description: ''
        }
      },
      computed: {
        formValid () {
          return this.title !== '' &&
            this.location !== '' &&
            this.imageUrl !== '' &&
            this.description !== ''
        }
      },
      methods: {
        onCreateMeetup () {
          let meetupData = {
            title: this.title,
            location: this.location,
            imageUrl: this.imageUrl,
            description: this.description
          }
          this.$store.dispatch('createMeetup', meetupData)
        }
      }
    }
</script>

<style scoped>

</style>
