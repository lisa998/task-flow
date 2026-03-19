<script>
import LoadingIcon from "@/components/LoadingIcon.vue";

export default {
  name: "NotificationDropdown",
  components: {LoadingIcon},
  methods: {
    markRead(id) {
      this.$store.dispatch("notifications/markRead", id);
    },
    markAllRead() {
      this.$store.dispatch("notifications/markAllRead");
    },
  },
  computed: {
    notifications() {
      return this.$store.state.notifications.notifications.slice(0, 3);
    },
    loading() {
      return this.$store.state.notifications.loading;
    }
  },
}
</script>

<template>
  <v-card
      class="right-40 top-14 relative z-50"
      elevation="12"
      style="position: absolute !important;"
      width="256"
  >
    <v-navigation-drawer floating permanent>
      <v-list dense rounded>
        <v-list-item class="d-flex space-between align-center">
          <v-list-item-title>通知</v-list-item-title>
          <LoadingIcon v-if="loading.markAllRead" class="text-end relative" size="16">loading</LoadingIcon>
          <v-list-item-subtitle v-else class="text-end cursor-pointer h-4 relative" @click="markAllRead">
            全部已讀
          </v-list-item-subtitle>
        </v-list-item>


        <v-list-item-subtitle v-if="!loading.fetch && notifications.length === 0" class="text-text text-center my-14">
          目前沒有通知
        </v-list-item-subtitle>
        <div v-else>
          <div v-if="loading.fetch">
            <v-skeleton-loader v-for="(_,i) in 3" :key="i" type="list-item-two-line"/>
          </div>
          <div v-else>
            <v-list-item
                v-for="n in notifications" :key="n.message"
                :to="n.link"
                link
                two-line
                @click="markRead(n.id)"
            >
              <v-list-item-icon class="mr-2 mt-3">
                <v-icon v-if="n.read" color="primary" size="20">mdi-check-circle</v-icon>
                <v-icon v-else size="20">mdi-radiobox-blank</v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-sm" two-line>
                {{ n.message }}
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-list-item class="d-flex space-between" link>
            <v-list-item-subtitle class="flex justify-center cursor-pointer">
              <span>查看所有通知</span>
              <v-icon class="ml-2" size="16">mdi-arrow-right-thick</v-icon>
            </v-list-item-subtitle>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<style scoped>

</style>
