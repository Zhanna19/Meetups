<template>
  <v-dialog max-width="350" persistent v-model="editDialog">
    <v-btn accent slot="activator">Edit Time</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" actions format="24hr">
              <template>
                <v-btn flat color="blue darken-1" @click.native="editDialog = false">Close</v-btn>
                <v-btn flat color="blue darken-1" @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
      name: 'EditMeetupDate',
      props: ['meetup'],
      data () {
        return {
          editDialog: false,
          editableTime: null
        }
      },
      methods: {
        onSaveChanges () {
          let newDate = new Date(this.meetup.date)
          let hours = this.editableTime.match(/^(\d+)/)[1]
          let minutes = this.editableTime.match(/:(\d+)/)[1]
          newDate.setHours(hours)
          newDate.setMinutes(minutes)
          this.$store.dispatch('updateMeetupData', {
            id: this.meetup.id,
            date: newDate
          })
        }
      },
      created () {
        let time = new Date(this.meetup.date).getHours() + ':' + new Date(this.meetup.date).getMinutes()
        this.editableTime = time.toString()
      }
    }
</script>

<style scoped>

</style>
