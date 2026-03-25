<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/dashboard'},
        {title: 'Projects', icon: 'mdi-folder', link: '/projects'},
        {title: 'Reports', icon: 'mdi-file-chart', link: '/reports'},
        {title: 'Settings', icon: 'mdi-cog', link: '/settings'},
      ],
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<template>
  <v-card
      class="flex-grow-0 fixed left-0 top-0"
      height="100vh"
      width="256"
  >
    <v-navigation-drawer
        class="teal lighten-5"
        light
        overlay-color="white"
        overlay-opacity="0.2"
        permanent
    >
      <v-list>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">
            Logout
            <v-icon class="ml-2" size="20">mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<style scoped>

</style>