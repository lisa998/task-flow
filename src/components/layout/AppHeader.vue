<script>
import UserMenu from "@/components/layout/UserMenu.vue";
import NotificationDropdown from "@/components/layout/NotificationDropdown.vue";

export default {
  name: "AppHeader",
  components: {NotificationDropdown, UserMenu},
  data() {
    return {
      isOpenMenu: '',
    }
  },
  methods: {
    handleOpenMenu(menuName) {
      this.isOpenMenu = this.isOpenMenu === menuName ? '' : menuName
    }
  },
  computed: {
    routeName() {
      const path = this.$route?.path || ''
      const segments = path.split('/').filter(Boolean)
      return segments.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('/')
    },
  },
  async mounted() {
    await this.$store.dispatch("notifications/fetchNotifications");
  }
}
</script>

<template>
  <v-card class="overflow-hidden flex-grow">
    <v-app-bar
        color="#43a08c"
        dark
        fade-img-on-scroll
        prominent
        scroll-target="#scrolling-techniques-5"
        scroll-threshold="500"
        shrink-on-scroll
        src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
            gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
            v-bind="props"
        ></v-img>
      </template>

      <h2 class="m-2">{{ routeName }}</h2>


      <v-text-field
          class="mt-3 ml-5"
          height="24"
          label="Search"
          prepend-icon="mdi-magnify"
      ></v-text-field>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-btn icon @click="()=>handleOpenMenu('notification')">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <!--  有通知    mdiBellBadge-->

        <v-btn class="d-flex align-center rounded-xl py-3" height="100%" text
               @click="()=>handleOpenMenu('user')">
          <v-avatar class="rounded-circle" size="24">
            <img alt="" src="https://picsum.photos/200/200?random"/>
          </v-avatar>
          <span class="mx-2">name</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </div>

    </v-app-bar>
    <v-sheet
        id="scrolling-techniques-5"
        class="overflow-y-auto"
        max-height="100vh"
    >
      <v-container style="min-height: 100vh">
        <router-view/>
        <user-menu v-if="isOpenMenu === 'user'"/>
        <notification-dropdown v-if="isOpenMenu === 'notification'"/>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<style scoped>

</style>