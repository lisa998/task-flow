<script>
import BaseTable from "@/components/organisms/BaseTable.vue";
import colors from "@/assets/theme/colors.json";
import DialogContainer from "@/components/organisms/DialogContainer.vue";
import HalfMaskIcon from "@/components/molecules/HalfMaskIcon.vue";
import ButtonGroup from "@/components/molecules/ButtonGroup.vue";
import VirtualScroll from "@/components/wrappers/VirtualScroll.vue";

const statusColor = Object.freeze({
  active: colors["primary"],
  archived: 'rgba(0, 0, 0, 0.3)',
  completed: colors["accent-yellow"],
})

const modalType = Object.freeze({
  EDIT: {
    name: 'edit',
    title: '編輯專案',
  },
  DELETE: {
    name: 'delete',
    title: '刪除專案',
  }
})

const projectStatus = Object.freeze({
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  COMPLETED: 'completed',
})

const projectFilterValue = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
})

const projectFilterMapping = Object.freeze({
  [projectFilterValue.ALL]: () => true,
  [projectFilterValue.ACTIVE]: project => project.status === projectStatus.ACTIVE,
  [projectFilterValue.COMPLETED]: project => project.status === projectStatus.COMPLETED,
})

export default {
  name: "ProjectsPage",
  components: {VirtualScroll, ButtonGroup, HalfMaskIcon, DialogContainer, BaseTable},
  data: () => ({
    columnsConfig: [
      {title: '專案名稱', key: 'name', slot: true},
      {title: '狀態', key: 'status', slot: true},
      {title: '成員', key: 'members', slot: true},
      {title: '操作', key: 'actions', slot: true},
    ],
    statusColor,
    openModal: null,
    dialogProject: {},
    modalType,
    selectedFilter: 'all',
  }),
  methods: {
    toggleModal(type, project = {}) {
      if (this.openModal !== modalType[type].name) {
        this.openModal = modalType[type].name
        this.dialogProject = project
      } else {
        this.openModal = null
      }
    },
    deleteProject(projectId) {
      this.$store.dispatch('projects/delete', projectId)
      this.openModal = null
    },
    changeProjectFilter(value) {
      this.selectedFilter = value
      this.$router.push({query: {status: this.selectedFilter}})
    },
    virtualTable(startIndex, endIndex) {
      return this.fetchTable.slice(startIndex, endIndex)
    }
  },
  computed: {
    fetchTable() {
      if (!this.$store.state.projects.data.length) return []
      return this.$store.state.projects.data.filter(project => {
        const filterFunc = projectFilterMapping[this.selectedFilter]
        return filterFunc(project)
      })
    },
    buttons() {
      return [
        {label: '全部專案', value: projectFilterValue.ALL},
        {label: '進行中', value: projectFilterValue.ACTIVE},
        {label: '已完成', value: projectFilterValue.COMPLETED},
      ].map(btn => ({
        ...btn,
        selected: btn.value === this.selectedFilter,
        action: this.changeProjectFilter,
      }))
    },
  },
  created() {
    const status = this.$route.query.status
    if (status && Object.values(projectFilterValue).includes(status)) {
      this.selectedFilter = status
    }
  },
  mounted() {
    this.$store.dispatch("projects/getAll");
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between align-center mb-6">
      <div class="flex justify-between align-center">
        <h2 class="font-bold text-title ">專案篩選：</h2>
        <ButtonGroup :buttons="buttons"/>
      </div>
      <v-btn
          color="primary" elevation="0"
          x-large
          @click="()=>{}"
      >
        <v-icon class="mr-2">mdi-plus-box-multiple</v-icon>
        新增專案
      </v-btn>
    </div>
    <VirtualScroll :container-height="480" :items-height="56" :items-length="fetchTable.length">
      <template v-slot="{startIndex, endIndex}">
        <BaseTable :columns-config="columnsConfig" :data="virtualTable(startIndex, endIndex)"
        >
          <template v-slot:name="{row:project}">
            <router-link :to="`/projects/${project?.id}`">
              <span class="text-text hover:underline">{{ project?.name }}</span>
            </router-link>
          </template>
          <template v-slot:status="{row: project}">
            <v-chip
                :color="statusColor[project?.status]"
                class="ml-2"
                small
                text-color="white"
            >
              <v-avatar left>
                <v-icon color="white">mdi-circle-medium</v-icon>
              </v-avatar>
              {{ project?.status }}
            </v-chip>
          </template>
          <template v-slot:members="{row: project}">
            <div class="flex align-center">
              <v-avatar
                  v-for="member in project?.members.slice(0,3)"
                  :key="member.id"
                  size="32"
              >
                <img :src="member.avatar" alt="Avatar">
              </v-avatar>
              <span v-if="project?.members.length>3" class="ml-2 mr-2"> + {{ project?.members.length - 3 }}</span>
            </div>
          </template>
          <template v-slot:actions="{row: project}">
            <div>
              <v-btn
                  color="primary"
                  icon
                  text
                  @click="()=>toggleModal('EDIT',project)"
              >
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn
                  color="rgba(0, 0, 0, 0.5)"
                  icon
                  text
                  @click="()=>toggleModal('DELETE',project)"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </div>
          </template>
        </BaseTable>
      </template>
    </VirtualScroll>

    <DialogContainer v-if="openModal=== modalType.EDIT.name" :is-open="openModal=== modalType.EDIT.name"
                     :title="modalType.EDIT.title + ': ' + dialogProject?.name"
                     :toggle="()=>toggleModal('EDIT')">
      <template v-slot:symbol>
        <HalfMaskIcon icon-name="mdi-file-edit"/>
      </template>
      <template v-slot>Form
        <div class="h-[600px] w-[600px]">123</div>
      </template>
    </DialogContainer>

    <DialogContainer v-if="openModal=== modalType.DELETE.name" :is-open="openModal=== modalType.DELETE.name"
                     :title="modalType.DELETE.title + ': ' + dialogProject?.name"
                     :toggle="()=>toggleModal('DELETE')">
      <template v-slot:symbol>
        <HalfMaskIcon icon-name="mdi-delete-alert"/>
      </template>
      <template v-slot>
        <div class="flex gap-10 justify-center align-center">
          <v-btn
              :style="{color: 'white'}"
              color="accent-peach-dark"
              elevation="2"
              x-large
              @click="()=>deleteProject(dialogProject?.id)"
          >確認
          </v-btn>
          <v-btn
              elevation="2"
              x-large
              @click="()=>toggleModal('DELETE')"
          >取消
          </v-btn>
        </div>
      </template>
    </DialogContainer>
  </div>
</template>

<style scoped>

</style>