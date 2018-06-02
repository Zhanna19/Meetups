<template>
  <v-dialog max-width="340" persistent v-model="editDialog">
    <v-btn accent slot="activator">Edit Date</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" width="100%" actions>
              <template>
                <v-btn flat color="blue darken-1" @click.native="editDialog = false">Close</v-btn>
                <v-btn flat color="blue darken-1" @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
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
          editableDate: null
        }
      },
      methods: {
        onSaveChanges () {
          let newDate = new Date(this.meetup.date)
          let newDay = new Date(this.editableDate).getUTCDate()
          let newMonth = new Date(this.editableDate).getUTCMonth()
          let newYear = new Date(this.editableDate).getUTCFullYear()
          newDate.setUTCDate(newDay)
          newDate.setUTCMonth(newMonth)
          newDate.setUTCFullYear(newYear)
          this.$store.dispatch('updateMeetupData', {
            id: this.meetup.id,
            date: newDate
          })
        }
      },
      created () {
        let date = new Date(this.meetup.date).getFullYear() + '-' + (new Date(this.meetup.date).getMonth() + 1) + '-' + new Date(this.meetup.date).getDate()
        this.editableDate = date.toString()
      }
    }
</script>

<style scoped>

</style>
