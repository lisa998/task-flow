<script>
export default {
  name: "ValidationProvider",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    rules: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  methods: {
    validate() {

    }
  }
}
</script>

<template>
  <div></div>
</template>

<style scoped>

</style>