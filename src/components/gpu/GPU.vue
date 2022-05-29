<template>
  <AppBar/>
  <v-container>
    <v-row v-for="n in 2" :key="n">
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4">GPU:{{n-1}} GeForce RTX 2080TI</v-card-title>
          <v-card-subtitle>adawdiwhjeowqheouheq</v-card-subtitle>
          <v-card-text>
            <span class="text-h6">GPU 显存使用</span>
            <v-progress-linear model-value="73" color="blue-grey" height="30">
              1024/11625 MiB
            </v-progress-linear>
          </v-card-text>

          <v-card-text>
            <span class="text-h6">GPU 利用率</span>
            <v-progress-linear model-value="73" color="blue-grey" height="30" >
              73%
            </v-progress-linear>
          </v-card-text>

          <v-card-text>
            <span class="text-h6">GPU 功率</span>
            <v-progress-linear model-value="73" color="blue-grey" height="30">
              25/250 W
            </v-progress-linear>
          </v-card-text>

          <v-card-text>
            <span class="text-h6">GPU 温度</span>
            <v-progress-linear model-value="73" color="blue-grey" height="30">
              73 C
            </v-progress-linear>
          </v-card-text>


        </v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>

import AppBar from "@/components/AppBar";

export default {
  name: 'GPU',
  components: {AppBar},
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
