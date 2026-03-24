<script>
import {TaskFilterType} from "@/store/modules/tasks";

export default {
  name: "TaskSearchFilter",
  data() {
    return {
      TaskFilterType
    }
  },
  computed: {
    filter() {
      console.log(this.$store.state.tasks.filter)
      return this.$store.state.tasks.filter;
    }
  },
  methods: {
    setFilter(key, newValue) {
      this.$store.commit('tasks/setFilter', {...this.filter, [key]: newValue})
    }
  }
}
</script>

<template>
  <v-card class="mb-4 pt-4 px-4 bg-primary-light" color="primary-light" elevation="2"
          outlined shaped>
    <div class="flex gap-2 align-center mb-4 justify-between">
      <h2 class="font-bold text-title">任務篩選：</h2>
      <v-btn plain rounded>
        <div>Reset</div>
        <v-icon size="16">mdi-arrow-u-left-top</v-icon>
      </v-btn>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <v-text-field
          :value="filter?.[TaskFilterType.PROJECT_ID]"
          height="24"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          solo
          @input="(v)=>setFilter(TaskFilterType.PROJECT_ID, v)"
      ></v-text-field>
      <v-select
          :items="['foo', 'bar', 'fizz', 'buzz']"
          :value="filter?.[TaskFilterType.STATUS]"
          label="狀態"
          solo
          @input="(v)=>setFilter(TaskFilterType.STATUS, v)"
      ></v-select>
      <v-select
          :items="['foo', 'bar', 'fizz', 'buzz']"
          :value="filter?.[TaskFilterType.PRIORITY]"
          label="優先"
          solo
          @input="(v)=>setFilter(TaskFilterType.PRIORITY, v)"
      ></v-select>
      <v-select
          :items="['foo', 'bar', 'fizz', 'buzz']"
          :value="filter?.[TaskFilterType.ASSIGNEE]"
          label="負責人"
          solo
          @input="(v)=>setFilter(TaskFilterType.ASSIGNEE, v)"
      ></v-select>
      <v-select
          :items="['foo', 'bar', 'fizz', 'buzz']"
          :value="filter?.[TaskFilterType.SORT]"
          label="排序"
          solo
          @input="(v)=>setFilter(TaskFilterType.SORT, v)"
      ></v-select>
    </div>
  </v-card>
</template>

<style scoped>

</style>