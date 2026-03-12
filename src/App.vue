<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("notifications/fetchNotifications");
    this.$store.dispatch("dashboard/fetchDashboard");
  }
};
</script>
<style>
body {
  overflow: hidden;
  height: 100vh;
}
</style>