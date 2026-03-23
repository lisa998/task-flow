<script>
import BaseTable from "@/components/organisms/BaseTable.vue";
import colors from "@/assets/theme/colors.json";
import DialogContainer from "@/components/organisms/DialogContainer.vue";
import HalfMaskIcon from "@/components/molecules/HalfMaskIcon.vue";
import ButtonGroup from "@/components/molecules/ButtonGroup.vue";
import VirtualScroll from "@/components/wrappers/VirtualScroll.vue";
import ProjectForm from "@/components/organisms/ProjectForm.vue";
import {Portal} from 'portal-vue'

const statusColor = Object.freeze({
  active: colors["primary"],
  archived: 'rgba(0, 0, 0, 0.3)',
  completed: colors["accent-yellow"],
})

const modalType = Object.freeze({
  EDIT: {
    name: 'EDIT',
    title: '編輯專案',
  },
  DELETE: {
    name: 'DELETE',
    title: '刪除專案',
  },
  CREATE: {
    name: 'CREATE',
    title: '新增專案',
  }
})

export const projectStatus = Object.freeze({
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
  components: {ProjectForm, VirtualScroll, ButtonGroup, HalfMaskIcon, DialogContainer, BaseTable, Portal},
  data: () => ({
    columnsConfig: [
      {title: '專案名稱', key: 'name', slot: true},
      {title: '狀態', key: 'status', slot: true},
      {title: '成員', key: 'members', slot: true},
      {title: '操作', key: 'actions', slot: true},
    ],
    statusColor,
    isOpenModal: null,
    dialogProject: null,
    modalType,
    selectedFilter: 'all',
  }),
  methods: {
    openModal(type, project = null) {
      this.isOpenModal = modalType[type].name
      this.dialogProject = project
    },
    closeModal() {
      this.isOpenModal = null
      this.dialogProject = null
    },
    deleteProject(projectId) {
      this.$store.dispatch('projects/delete', projectId)
      this.isOpenModal = null
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
    modalTitle() {
      if (!this.isOpenModal) return ''
      const projectName = this.dialogProject?.name ? ': ' + this.dialogProject.name : ''
      return this.modalType[this.isOpenModal].title + projectName
    }
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
          @click="()=>openModal('CREATE')"
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
                  @click="()=>openModal('EDIT',project)"
              >
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn
                  color="rgba(0, 0, 0, 0.5)"
                  icon
                  text
                  @click="()=>openModal('DELETE',project)"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </div>
          </template>
        </BaseTable>
      </template>
    </VirtualScroll>
    <Portal to="modals">
      <DialogContainer v-if="isOpenModal=== modalType.EDIT.name|| isOpenModal===modalType.CREATE.name"
                       :is-open="isOpenModal=== modalType.EDIT.name|| isOpenModal===modalType.CREATE.name"
                       :title="modalTitle"
                       @close="closeModal">
        <template v-slot:symbol>
          <HalfMaskIcon icon-name="mdi-file-edit"/>
        </template>
        <template v-slot>
          <div class="w-[600px]">
            <ProjectForm :project="dialogProject" @close="closeModal"/>
          </div>
        </template>
      </DialogContainer>
    </Portal>
    <DialogContainer v-if="isOpenModal=== modalType.DELETE.name" :is-open="isOpenModal=== modalType.DELETE.name"
                     :title="modalType.DELETE.title + ': ' + dialogProject?.name"
                     @close="closeModal">
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
              @click="closeModal"
          >取消
          </v-btn>
        </div>
      </template>
    </DialogContainer>
  </div>
</template>

<style scoped>

</style>