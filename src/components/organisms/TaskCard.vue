<script>

import {priorityColors} from '@/assets/theme/colorSetting'
import {formatDate} from '@/utils/dateText'

export default {
  name: "TaskCard",
  props: {
    title: {type: String, required: true},
    description: {type: String, default: ''},
    tags: {type: Array, default: () => []},
    checklist: {type: Array, default: () => []},
    priority: {type: String, default: ''},
    assignee: {type: String, default: ''},
    dueDate: {type: String, default: ''},
  },
  computed: {
    priorityColors() {
      return priorityColors
    },
    checklistDone() {
      return this.checklist.filter(i => i.done).length
    },
    priorityConfig() {
      const color = priorityColors[this.priority]
      if (!color) return null
      return {label: this.priority, color}
    },
    formattedDate() {
      if (!this.dueDate) return ''
      return formatDate(this.dueDate)
    }
  }
}
</script>

<template>
  <v-card class="task-card" elevation="2" outlined shaped>
    <h3 class="task-card__title font-weight-bold text-primary text-2xl">
      {{ title }}
    </h3>

    <div v-if="description" class="task-card__description text-body-2 text--secondary">
      {{ description }}
    </div>

    <div v-if="tags.length" class="flex flex-wrap gap-1 mt-2">
      <v-chip
          v-for="tag in tags"
          :key="tag"
          :color="priorityColors.low"
          class="ml-2"
          small text-color="white"
      >
        <v-avatar left>
          <v-icon size="16">mdi-tag</v-icon>
        </v-avatar>
        {{ tag }}
      </v-chip>
    </div>

    <v-divider class="my-4"/>

    <div v-if="checklist.length" class="m-1">
      <div class="d-flex justify-space-between align-center mb-4">
        <span class="text-caption text--secondary">子任務進度</span>
        <span class="text-caption font-weight-medium">{{ checklistDone }}/{{ checklist.length }}</span>
      </div>
      <div v-for="item in checklist" :key="item.name" class="d-flex align-center gap-2 mb-1">
        <v-icon :color="item.done ? 'primary' : 'primary-light'" size="20">mdi-checkbox-marked-circle</v-icon>
        <span :class="{'text--secondary': item.done}">{{ item.name }}</span>
      </div>
      <v-progress-linear
          :value="(checklistDone / checklist.length) * 100"
          background-color="primary-light"
          class="mt-4"
          color="primary"
          height="4"
          rounded
      />
    </div>

    <div class="task-card__footer">
      <div class="d-flex align-center gap-4">
        <span v-if="priority">
          <v-chip
              :color="priorityColors[priority]"
              class="ml-2"
              small text-color="white"
          >
          <v-avatar left>
            <v-icon>mdi-circle-medium</v-icon>
          </v-avatar>
          {{ priority }}
        </v-chip>
        </span>
        <span v-if="assignee" class="text-caption text--secondary">
          <v-icon>mdi-account</v-icon> {{ assignee }}
        </span>
      </div>
      <span v-if="formattedDate" class="text-caption text--secondary">
        <v-icon>mdi-calendar-range</v-icon> {{ formattedDate }}
      </span>
    </div>
  </v-card>
</template>

<style scoped>
.task-card {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-card__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-card__description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.task-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>