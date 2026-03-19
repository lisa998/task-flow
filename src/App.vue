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
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("notifications/fetchNotifications");
    this.$store.dispatch("dashboard/fetchDashboard");
  }
};
</script>
<style lang="scss">

body {
  overflow: hidden;
  height: 100vh;
}
</style>