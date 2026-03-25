<template>
  <v-app>
    <router-view/>
    <ToastList/>
    <portal-target name="modals"/>
  </v-app>
</template>

<script>

import ToastList from "@/components/molecules/ToastList.vue";

export default {
  name: 'App',
  components: {ToastList},
  data: () => ({
    //
  }),
  async created() {
    await this.$store.dispatch("notifications/fetchNotifications");
    await this.$store.dispatch("dashboard/fetchDashboard");
  }
};
</script>
<style lang="scss">

body {
  overflow: hidden;
  height: 100vh;
}
</style>