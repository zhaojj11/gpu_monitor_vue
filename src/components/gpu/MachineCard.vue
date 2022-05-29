<template>
  <v-card
      class="mx-auto"
      max-width="344"
      outlined
  >
    <v-card-title>{{ name }}</v-card-title>
    <v-card-content>

      <v-list-item two-line>
<!--        <v-list-item-content>-->
<!--          <v-list-item-title>GPUS</v-list-item-title>-->
<!--          <v-list-item-subtitle>2</v-list-item-subtitle>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->
<!--      <v-list-item>-->
<!--        <v-list-item-content>-->
<!--          <v-list-item-title>IP</v-list-item-title>-->
<!--          <v-list-item-subtitle>192.168.0.202</v-list-item-subtitle>-->
<!--        </v-list-item-content>-->
      </v-list-item>
    </v-card-content>
    <v-card-actions>
      <v-btn to="/gpu">
        更多信息
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  name: "MachineCard",
  data() {
    return {
      name: '202'
    }
  }
}
</script>

<style scoped>

</style>
