<script>
export default {
  name: "UserMenu",
  data() {
    return {
      items: [
        {title: 'Profile', icon: 'mdi-account'},
        {title: 'Settings', icon: 'mdi-cog', link: '/settings'},
        {
          title: 'Logout', icon: 'mdi-logout', action: () => {
            console.log('logout')
          }
        },
      ],
    }
  },
}
</script>

<template>
  <v-card
      class="right-4 top-14 relative z-50"
      elevation="12"
      style="position: absolute !important;"
      width="256"
  >
    <v-navigation-drawer
        floating
        permanent
    >
      <v-list
          dense
          rounded
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item?.link"
            link
            @click="item?.action ? item.action() : null"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<style scoped>

</style>