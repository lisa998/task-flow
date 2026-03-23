<script>
import FormProvider from "@/components/wrappers/FormProvider.js";
import FormField from "@/components/wrappers/FormField.js";
import {inputValidate} from "@/utils/validators";

import {projectStatus} from "@/pages/ProjectsPage.vue";

export default {
  name: "ProjectForm",
  components: {FormField, FormProvider},
  props: {
    project: {
      type: Object,
      default: null,
    }
  },
  computed: {
    selectItems() {
      return Object.values(projectStatus)
    },
    defaultValues() {
      return {
        name: this.project?.name ?? '',
        description: this.project?.description ?? '',
        status: this.project?.status ?? 'active',
      }
    },
  },
  methods: {
    inputValidate,
    async onSubmit(value) {
      const projectId = this.project?.id
      const action = projectId ? 'projects/patch' : 'projects/post'
      const payload = projectId ? {id: projectId, projectData: value} : value

      try {
        const resp = await this.$store.dispatch(action, payload)
        if (resp?.id) {
          this.$emit('close')
        }
      } catch (error) {
        await this.$store.dispatch('toasts/createToast', '儲存失敗')
      }
    },
  },
}
</script>

<template>
  <FormProvider v-slot="{handleSubmit, formMessage}" :default-values="defaultValues" :on-submit="onSubmit">
    <FormField v-slot="{field}"
               :validate="(v)=>inputValidate(v,['required', ['maxLength', 20]])"
               name="name">
      <v-text-field :error="!!field.state?.error"
                    :error-messages="field.state?.error"
                    :name="field.name"
                    :value="field.state.value"
                    label="專案名稱 *"
                    outlined
                    @blur="field.handleBlur"
                    @input="field.handleChange"
      />
    </FormField>
    <FormField v-slot="{field}"
               name="description">
      <v-textarea
          :error="!!field.state?.error"
          :error-messages="field.state?.error"
          :name="field.name"
          :value="field.state.value"
          label="描述"
          outlined
          @blur="field.handleBlur"
          @input="field.handleChange"
      ></v-textarea>
    </FormField>
    <FormField v-slot="{field}" name="status">
      <v-select
          :error="!!field.state?.error"
          :error-messages="field.state?.error"
          :items="selectItems"
          :name="field.name"
          :value="field.state.value"
          label="狀態 *"
          outlined
          @blur="field.handleBlur"
          @input="field.handleChange"
      ></v-select>
    </FormField>
    <div class="text-center text-accent-rose text-sm">{{ formMessage }}</div>
    <div class="flex justify-center align-center p-4 gap-10">
      <v-btn :style="{color: 'white'}"
             color="accent-peach-dark"
             elevation="2"
             x-large
             @click="handleSubmit">
        儲存
      </v-btn>
      <v-btn elevation="2"
             x-large
             @click="()=>$emit('close')"
      >
        取消
      </v-btn>
    </div>
  </FormProvider>
</template>

<style scoped>

</style>