<script>
import {formatRelativeTime} from "@/utils/dateText";
import EmptyState from "@/components/molecules/EmptyState.vue";

export default {
  name: "DashboardPage",
  components: {EmptyState},
  data() {
    return {
      clipsColor: {urgent: '#DDA0AD', high: '#ECA88F', medium: '#EED27A', low: 'rgba(67,160,140,0.65)'}
    }
  },
  methods: {
    formatRelativeTime(date, detail = false) {
      return formatRelativeTime(date, detail);
    }
  },
  computed: {
    dashboard() {
      console.log(this.$store.state.dashboard)
      return this.$store.state.dashboard
    },
    taskLists() {
      return [
        {title: '逾期任務', icon: 'mdi-clock-alert', tasks: this.dashboard.data?.overdueTasks},
        {title: '即將到期', icon: 'mdi-calendar-clock', tasks: this.dashboard.data?.upcomingTasks},
      ]
    },
    summary() {
      if (!this.dashboard.data?.summary || this.dashboard.loading.fetch) return []
      const {totalTasks, overdue, upcoming, todayTodo} = this.dashboard.data?.summary
      return [
        {title: '總任務數', value: totalTasks},
        {title: '逾期任務數', value: overdue},
        {title: '即將到期任務數', value: upcoming},
        {title: '完成任務數', value: todayTodo}
      ]
    }
  },
  async mounted() {
    await this.$store.dispatch("dashboard/fetchDashboard");
  }
}
</script>

<template>
  <EmptyState v-if="dashboard?.data?.summary?.totalTasks === 0 && !dashboard?.loading?.fetch"/>
  <div v-else class="grid gap-y-12 mt-4">
    <div>
      <div class="grid grid-cols-4 gap-8">
        <div v-for="type in summary" :key="type.title">
          <v-card
              class="p-6 card"
              elevation="2"
              outlined
              shaped
          >
            <h2 class="mb-4 text-text text-lg">{{ type.title }}</h2>
            <p class="text-end text-2xl font-bold text-primary">{{ type.value }}</p>
          </v-card>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-8">
      <div v-for="taskList in taskLists" :key="taskList.title">
        <v-card
            class="p-6 card h-full"
            elevation="2"
            outlined
            shaped
        >
          <h2 class="mb-4 text-text font-bold text-xl">
            <v-icon class="ball mb-1">{{ taskList.icon }}</v-icon>
            {{ taskList.title }}
          </h2>
          <div v-if="dashboard.loading.fetch">
            <v-skeleton-loader v-for="(_,i) in 3" :key="i" type="list-item-two-line"></v-skeleton-loader>
          </div>
          <ul v-else-if="taskList?.tasks?.length > 0" class="grid gap-2">
            <li v-for="task in taskList?.tasks" :key="task?.id" class="text-lg group" type="circle">
              <span class="text-primary text-md group-hover:underline cursor-pointer">{{ task.title }}</span> --
              <span class="text-text text-sm"> {{ task.project }}</span>
              <v-chip
                  :color="clipsColor[task.priority]"
                  class="ml-2"
                  small
                  text-color="white"
              >
                <v-avatar left>
                  <v-icon>mdi-circle-medium</v-icon>
                </v-avatar>
                {{ task.priority }}
              </v-chip>
              <span class="ml-2 text-text text-xs">{{ formatRelativeTime(task.dueDate) }}</span>
            </li>
          </ul>
        </v-card>
      </div>
    </div>
    <div>
      <v-card
          class="p-6 card"
          elevation="2"
          outlined
          shaped
      >
        <h2 class="mb-4 text-text font-bold text-xl">
          <v-icon class="ball mb-1">mdi-history</v-icon>
          最近活動
        </h2>
        <div v-if="dashboard.loading.fetch">
          <v-skeleton-loader v-for="(_,i) in 3" :key="i" type="list-item-two-line"></v-skeleton-loader>
        </div>
        <ul v-else-if="this.dashboard.data?.recentActivities?.length > 0" class="grid gap-2">
          <li v-for="task in this.dashboard.data?.recentActivities" :key="task?.id" class="text-lg group" type="circle">
            <span class="mr-4 text-text text-xs">{{ formatRelativeTime(task.timestamp, true) }}</span>
            <span class="text-primary text-md group-hover:underline cursor-pointer">{{ task.message }}</span>
          </li>
        </ul>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin bg-circle($blur, $color) {
  position: absolute;
  border-radius: 50%;
  background-color: $color;
  filter: blur($blur);
  z-index: 0;
  animation: breathlight 3s ease-in-out infinite backwards;
}

.card {
  overflow: hidden;

  & > * {
    z-index: 1;
    position: relative;
  }

  &::before {
    content: '';
    top: -30px;
    right: 10px;
    width: 100px;
    height: 60px;
    @include bg-circle(40px, #F2C2A4);
  }

  &::after {
    content: '';
    bottom: -30px;
    left: 10px;
    width: 80px;
    height: 40px;
    @include bg-circle(40px, #43a08c);
    animation-delay: 1.5s;
  }

  li {
    color: #43a08c;
  }
}

@keyframes breathlight {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 0.2;
  }
}

.card:hover .ball {
  animation: bounce 0.5s cubic-bezier(.5, .05, 1, .5) infinite backwards;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}

@keyframes bounce {
  from {
    transform: translate3d(0px, -10px, 0px);
  }
  to {
    transform: translate3d(0px, 0px, 0px);
  }
}
</style>
