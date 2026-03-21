<script>
import {validateCollection} from "@/utils/validators";

export default {
  name: "ButtonGroup",
  props: {
    buttons: {
      type: Array,
      required: true,
      validator: validateCollection({
        label: 'string', value: 'string', action: 'function', selected: 'boolean'
      }),
    }
  }
}
</script>

<template>
  <div class="flex gap-4">
    <v-btn v-for="btn in buttons" :key="btn?.value"
           :class="btn?.selected ? 'selected' : ''"
           elevation="0" @click="()=>btn?.action(btn?.value)"
    >

      {{ btn.label }}
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.selected {
  color: var(--v-primary-base);
}
</style>