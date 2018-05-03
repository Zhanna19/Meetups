<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <h4 class="primary--text">My meetup</h4>
            </v-card-title>
            <v-card-media
              class="white--text"
              height="400px"
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
            <v-card-text>
              <div class="info--text">17th July 2018 - Where it will be</div>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed molestie neque.
              Pellentesque ac lectus risus. Curabitur mattis et quam non scelerisque.
                Curabitur sagittis purus nisl, at efficitur velit porttitor non.</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
    export default {
      name: 'Meetup'
    }
</script>

<style scoped>

</style>
