<template>
  <AppBar/>
  <v-container>
    <v-row v-for="gpu in stats_gpus" :key="gpu.id">
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4">GeForce RTX 2080TI</v-card-title>
          <v-card-subtitle>{{ gpu.id }} </v-card-subtitle>
          <v-card-text>
            <span class="text-h6">GPU 显存使用</span>
            <v-progress-linear :model-value="gpu['memory%']" color="blue-grey" height="30">
              {{ gpu['memory_used'] }}/{{gpu['memory_total']}} MiB
            </v-progress-linear>
          </v-card-text>

          <v-card-text>
            <span class="text-h6">GPU 利用率</span>
            <v-progress-linear :model-value="gpu['utilization']" color="blue-grey" height="30">
              {{gpu['utilization']}}%
            </v-progress-linear>
          </v-card-text>

          <v-card-text>
            <span class="text-h6">GPU 功率</span>
            <v-progress-linear model-value="{{gpu['power%']}}" color="blue-grey" height="30">
              {{gpu['power_draw']}}/{{gpu['power_limit']}} W
            </v-progress-linear>
          </v-card-text>

          <v-card-text>
            <span class="text-h6">GPU 温度</span>
            <v-progress-linear :model-value="gpu['temperature']" color="blue-grey" height="30">
              {{gpu['temperature']}} C
            </v-progress-linear>
          </v-card-text>


        </v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>

import AppBar from "@/components/AppBar";
import {io} from "socket.io-client";
import {toRaw} from "vue";

var _ = require('lodash');
export default {
  name: 'GPU',
  components: {AppBar},
  data() {
    return {
      name: undefined,
      gpus: {}
    }
  },
  props: ['id'],
  mounted() {
    const socket = io("ws://localhost:5000", {query: {'space': 'specific', 'host_id': this.id}});

    socket.on("connect", () => {
      console.log("connect to GPU Monitor,ok!");
    });
    socket.on("specific_state_initialize", (...args) => {
      let machine = args[0];
      this.name = machine['name']
      this.gpus = machine['gpus']
    });
    socket.on('gpu_state_update',(...args)=>{
      let states = args[0];
      if (states['id'] !== this.id){
        return;
      }
      let gpus = _.cloneDeep(toRaw(this.gpus));
      _.forEach(states['gpu_states'],(state)=>{
        _.assign(gpus[state['id']],state);
      })
      this.gpus = gpus;
    })
  },
  computed: {
    stats_gpus() {
      let gpus = [];
      _.map(this.gpus, (v) => {
        gpus.push({
          ...v, 'memory%': _.floor(v['memory_used'] / v['memory_total'], 2) * 100,
          'power%': _.floor(v['power_draw'] / v['power_limit'], 2) * 100
        })
      })
      console.log(gpus);
      return gpus;
    }
  }
}
</script>

<style scoped>

</style>
