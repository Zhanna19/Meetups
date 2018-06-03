<template>
  <v-dialog max-width="340" persistent v-model="registerDialog">
    <v-btn color="info" accent slot="activator">
      {{userIsRegister ? 'Unregister' : 'Register'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegister">Unregister from Meetup?</v-card-title>
            <v-card-title v-else>Register for Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
           <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red darken-1" flat @click="registerDialog = false">Cancel</v-btn>
              <v-btn class="green darken-1" flat @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
      name: 'RegistrationDialog',
      props: ['meetupId'],
      data () {
        return {
          registerDialog: false
        }
      },
      computed: {
        userIsRegister () {
          return this.$store.getters.user.registerMeetups.findIndex(meetupId => {
            return meetupId === this.meetupId
          }) >= 0
        }
      },
      methods: {
        onAgree () {
          if (this.userIsRegister) {
            this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
          } else {
            this.$store.dispatch('registerUserForMeetup', this.meetupId)
          }
        }
      }
    }
</script>

<style scoped>

</style>
