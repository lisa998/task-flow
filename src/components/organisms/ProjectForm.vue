<script>
import FormProvider from "@/components/wrappers/FormProvider.js";
import FormField from "@/components/wrappers/FormField.js";
import {inputValidate} from "@/utils/validators";

import {projectStatus} from "@/pages/ProjectsPage.vue";

export default {
  name: "ProjectForm",
  components: {FormField, FormProvider},
  data: () => {
    return {
      defaultValues: {
        name: '',
        description: '',
        status: 'active',
      },
    }
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    }
  },
  computed: {
    selectItems() {
      return Object.values(projectStatus)
    }
  },
  methods: {
    onSubmit(value) {
      console.log('submit', value)
    },
    validator(value, rules) {
      return inputValidate(value, rules)
    },
  },
}
</script>

<template>
  <FormProvider v-slot="{handleSubmit}" :default-values="defaultValues" :on-submit="onSubmit">
    <FormField v-slot="{field}"
               :validate="(v)=>validator(v,['required', ['maxLength', '20']])"
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
             @click="closeModal"
      >
        取消
      </v-btn>
    </div>
  </FormProvider>
</template>

<style scoped>

</style>