<template>
    <v-dialog max-width="340" persistent v-model="editDialog">
      <v-btn fab accent slot="activator">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Edit Meetup</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  v-model="editTitle"
                  label="Title"
                  required
                >
                </v-text-field>
                <v-text-field
                  v-model="editDescription"
                  label="Description"
                  multi-line
                  required
                >
                </v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn flat color="blue darken-1" @click="editDialog = false">Close</v-btn>
                <v-btn flat color="blue darken-1" @click="onSaveChanges">Save</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
    export default {
      name: 'EditMeetup',
      props: ['meetup'],
      data () {
        return {
          editDialog: false,
          editTitle: this.meetup.title,
          editDescription: this.meetup.description
        }
      },
      methods: {
        onSaveChanges () {
          if (this.editTitle.trim() === '' || this.editDescription.trim() === '') {
            return
          }
          this.editDialog = false
          this.$store.dispatch('updateMeetupData', {
            id: this.meetup.id,
            title: this.editTitle,
            description: this.editDescription
          })
        }
      }
    }
</script>

<style scoped>

</style>
