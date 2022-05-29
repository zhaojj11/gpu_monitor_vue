<template>
  <v-app-bar>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>GPU Monitor</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import {io} from 'socket.io-client'

export default {
  name: "AppBar",
  mounted() {
    const socket = io("ws://localhost:5000");
    socket.on("connect", () => {
      console.log("connect to GPU Monitor,ok!");
    })
    socket.on("gpu_state_initialize", (...args) => {
      let data = args[0];
      console.log(data);
    })

  }
}
</script>

<style scoped>

</style>
