<template>
    <v-container>
      <v-layout row wrap class="mb-2">
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
          <v-btn large to="/meetups/new" class="info">Organize Meetup</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
            <v-carousel style="cursor: pointer">
              <v-carousel-item
                v-for="item in meetups"
                :src="item.imageUrl"
                :key="item.id"
                @click="onLoadMeetup(item.id)"
              >
                <div class="title">{{item.title}}</div>
              </v-carousel-item>
            </v-carousel>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-2">
        <v-flex xs12 class="text-xs-center">
          <p>Join our awesome meetups</p>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
    export default {
      name: 'Home',
      data () {
        return {
          meetups: [
            {imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200', id: 'asdsdsd1', title: 'Meetup in New York'},
            {imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-500759045_super.jpg?sharp=10&vib=20&w=1200', id: 'asdsdsd2', title: 'Paris'}
          ]
        }
      },
      methods: {
        onLoadMeetup (id) {
          this.$route.push(/meetups/ + id)
        }
      }
    }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,.5);
    color: #ffffff;
    font-size: 2em;
    padding: 20px;
  }
</style>
