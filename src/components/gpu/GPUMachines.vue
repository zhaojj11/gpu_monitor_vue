<template>
  <div>

    <AppBar />
    <v-container>
      <v-row>
        <v-col cols="6">
          <MachineCard></MachineCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MachineCard from "@/components/gpu/MachineCard";
import AppBar from "@/components/AppBar";

export default {
  name: "GPUMachines",
  props: {},
  components:{
    AppBar,
    MachineCard
  }
}
</script>

<style scoped>

</style>
