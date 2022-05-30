<template>
  <div>

    <AppBar/>
    <v-container>
      <v-row>
        <v-col cols="4" v-for="machine in machines" :key="machine.id">
          <MachineCard :machine="machine"></MachineCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MachineCard from "@/components/gpu/MachineCard";
import AppBar from "@/components/AppBar";
import {io} from "socket.io-client";
import {toRaw} from "vue";

const _ = require('lodash');
export default {
  name: "GPUMachines",
  props: {},
  components: {
    AppBar,
    MachineCard
  },
  data() {
    return {
      machines: []
    }
  },
  mounted() {
    const socket = io("ws://localhost:5000", {query: {'space': 'global'}});

    socket.on("connect", () => {
      console.log("connect to GPU Monitor,ok!");
    })
    socket.on("global_state_initialize", (...args) => {
      this.machines = args[0];
    })
    socket.on("gpu_state_update", (...args) => {
      let states = args[0];
      let machines = _.cloneDeep(toRaw(this.machines));
      _.forEach(machines, (m) => {
        if (m['id'] !== states['id']) return;
        _.forEach(states['gpu_states'],(state)=>{
          _.assign(m['gpus'][state['id']], state)
        });
      });
      this.machines = machines;
    })


  }
}
</script>

<style scoped>

</style>
