<script>
export default {
  name: "ToastList",
  methods: {
    close(id) {
      this.$store.commit("toasts/closeToast", id);
    }
  },
  computed: {
    toasts() {
      return this.$store.state.toasts.data;
    }
  }
}
</script>

<template>
  <div class="fixed right-6 bottom-6 flex flex-col gap-4 z-30">
    <v-card v-for="toast in toasts" :key="toast?.id" class="py-4 pl-6 pr-2"
            color="primary-light"
            elevation="2"
            outlined
            shaped
    >
      <span class="text-text">{{ toast?.text }}</span>
      <v-btn class="ml-2" icon @click="()=>close(toast?.id)">
        <v-icon size="20">mdi-window-close</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<style scoped>

</style>