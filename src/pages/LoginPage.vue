<script>
import FormProvider from "@/components/wrappers/FormProvider";
import FormField from "@/components/wrappers/FormField";
import {inputValidate} from "@/utils/validators";

export default {
  name: "LoginPage",
  components: {FormField, FormProvider},
  data() {
    return {
      showPassword: false,
      defaultValue: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    inputValidate,
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    async onSubmit(v) {
      await this.$store.dispatch("auth/login", v);
    }
  }
}
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <v-card class="w-[600px] p-10 my-auto" color="primary-light">
      <h2 class="text-center text-2xl font-bold">Login</h2>
      <v-card-subtitle class="text-center">TaskFlow Admin</v-card-subtitle>
      <FormProvider v-slot="{handleSubmit, formMessage}" :default-values="defaultValue" :on-submit="onSubmit"
                    class="d-flex flex-col">
        <FormField v-slot="{ field }" :validate="(v)=>inputValidate(v,['required','email'])" name="email">
          <v-text-field :error="!!field.state?.error"
                        :error-messages="field.state?.error"
                        :name="field.state?.name"
                        :value="field.state?.value"
                        background-color="white"
                        label="Email"
                        outlined
                        @blur="field.handleBlur"
                        @input="field.handleChange">
          </v-text-field>
        </FormField>
        <FormField v-slot="{ field }" :validate="(v)=>inputValidate(v,['required','password'])" name="password">
          <v-text-field :append-icon="showPassword?'mdi-eye-outline':'mdi-eye-off-outline'"
                        :error="!!field.state?.error"
                        :error-messages="field.state?.error"
                        :name="field.state?.name"
                        :type="showPassword?'text':'password'"
                        :value="field.state?.value"
                        background-color="white"
                        label="Password"
                        outlined
                        @blur="field.handleBlur"
                        @input="field.handleChange"
                        @click:append="toggleShowPassword"
          ></v-text-field>
        </FormField>
        <div class="text-center text-accent-rose text-sm">{{ formMessage }}</div>
        <v-btn color="primary" @click="handleSubmit">Login</v-btn>
      </FormProvider>
    </v-card>
  </div>
</template>

<style scoped>

</style>