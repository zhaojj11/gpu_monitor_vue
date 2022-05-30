<template>
  <v-card
      class="mx-auto"
      max-width="350"
      outlined
  >
    <v-card-title>{{ statistical_machine.name }}</v-card-title>
    <v-card-text>
      <v-card-subtitle>基本信息</v-card-subtitle>
      <v-list>
        <v-list-item title="GPU_NUMS">
          <v-list-item-title class="text-h5">
            {{ statistical_machine.gpu_nums }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item title="IP">
          <v-list-item-title class="text-h5">
            {{ statistical_machine.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-text>
      <v-card-subtitle>
        状态统计
      </v-card-subtitle>
      <v-list v-for="(stats_gpu,index) in statistical_gpus" :key="stats_gpu['id']">
        <v-list-item>
          <v-container>
            <v-row justify="center">
              <v-col cols="3" align-self="center">
                GPU{{ index }}
              </v-col>
              <v-col cols="9" align-self="center">
                <v-progress-linear :model-value="stats_gpu['weighted_util%']" height="15" color="blue">
                  {{ stats_gpu['weighted_util%'] }}%
                </v-progress-linear>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item>

      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="'/gpu/' + this.machine.id">
        更多信息
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
const _ = require('lodash');
export default {
  name: "MachineCard",
  data() {
    return {}
  },
  props: ['machine'],
  computed: {
    statistical_machine() {
      return {
        'name': this.machine.name,
        'gpu_nums': Object.keys(this.machine['gpus']).length.toString(),
        'ip': this.machine.name
      }
    },
    statistical_gpus() {
      let stats_gpus = [];
      _.map(this.machine['gpus'], (value, key) => {
        stats_gpus.push({
          'id': key,
          'weighted_util%': _.floor((value['memory_used'] / value['memory_total']) * 0.5 + (value['power_draw'] / value['power_limit']) * 0.5, 2) * 100
        })
      })
      return stats_gpus;
    }
  }
}
</script>

<style scoped>

</style>
