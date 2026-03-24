<script>
import TaskCard from "@/components/organisms/TaskCard.vue";
import DialogContainer from "@/components/organisms/DialogContainer.vue";
import ProjectForm from "@/components/organisms/ProjectForm.vue";
import HalfMaskIcon from "@/components/molecules/HalfMaskIcon.vue";
import TaskSearchFilter from "@/components/organisms/TaskSearchFilter.vue";

const modalType = Object.freeze({
  EDIT: {
    name: 'EDIT',
    title: '編輯專案',
  },
  CREATE: {
    name: 'CREATE',
    title: '新增專案',
  }
})

export default {
  name: "ProjectDetailPage",
  components: {TaskSearchFilter, HalfMaskIcon, ProjectForm, DialogContainer, TaskCard},
  data: () => ({
    isOpenModal: null,
    modalType,
    selectedFilter: 'all',
    items: ['foo', 'bar', 'fizz', 'buzz'],
  }),
  methods: {
    openModal(type) {
      this.isOpenModal = modalType[type].name
    },
    closeModal() {
      this.isOpenModal = null
    },
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between align-center mb-6">
      <div>ProjectData</div>
      <v-btn
          color="primary" elevation="0"
          x-large
          @click="()=>openModal('CREATE')"
      >
        <v-icon class="mr-2">mdi-plus-box-multiple</v-icon>
        新增任務
      </v-btn>
    </div>
    <TaskSearchFilter/>

    <task-card :checklist="[{name:'step1', done:true},{name:'step2', done:false}]" :tags="['bug','test']"
               assignee="assignee"
               description="description"
               dueDate="2024-12-31"
               priority="high"
               title="title"
    ></task-card>

    <Portal to="modals">
      <DialogContainer v-if="isOpenModal===modalType.CREATE.name"
                       :is-open="isOpenModal===modalType.CREATE.name"
                       title="新增任務"
                       @close="closeModal">
        <template v-slot:symbol>
          <HalfMaskIcon icon-name="mdi-file-edit"/>
        </template>
        <template v-slot>
          <div class="w-[600px]">
            <ProjectForm @close="closeModal"/>
          </div>
        </template>
      </DialogContainer>
    </Portal>
  </div>
</template>

<style scoped>

</style>