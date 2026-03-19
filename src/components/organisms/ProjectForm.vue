<script>
export default {
  name: "ProjectForm",
  data: () => {
    return {
      name: '',
      description: '',
      status: '',
    }
  },
  props: {
    originData: {
      type: Object,
      required: false,
    }
  },
  mounted() {
    if (this.originData) {
      this.name = this.originData.name
      this.description = this.originData.description
      this.status = this.originData.status
    }
  }
}
</script>

<template>
  <div>
    Form
    <input/>
  </div>
</template>

<style scoped>

</style>