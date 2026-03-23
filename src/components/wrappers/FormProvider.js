import Vue from "vue";

const FormMessage = Object.freeze({
    INVALID: '請修正表單中的錯誤後再提交',
    UNCHANGED: '表單未修改，無需提交',
})

export default {
    name: "FormProvider",
    props: {
        defaultValues: {
            type: Object,
            required: false,
            default: () => ({})
        },
        onSubmit: {
            type: Function,
            required: true,
        }
    },
    data() {
        return {
            values: structuredClone(this.defaultValues),
            touched: {},
            errors: {},
            isSubmitting: false,
            fieldRegistry: {},
            formMessage: '',
        }
    },
    provide() {
        return {
            formContext: this
        }
    },
    methods: {
        getFieldState(name) {
            return {
                value: this.values[name],
                touched: !!this.touched[name],
                error: this.errors[name] || null,
            }
        },
        setFieldValue(name, value) {
            Vue.set(this.values, name, value)
            this.formMessage = ''
        },
        setFieldTouched(name) {
            Vue.set(this.touched, name, true)
        },
        setFieldError(name, error) {
            if (error) {
                Vue.set(this.errors, name, error)
            } else {
                Vue.delete(this.errors, name)
            }
        },

        registerField(name, validate) {
            Vue.set(this.fieldRegistry, name, validate);
        },
        unregisterField(name) {
            Vue.delete(this.fieldRegistry, name);
        },
        validateAll() {
            let hasErrors = false
            Object.entries(this.fieldRegistry).forEach(([name, validate]) => {
                const value = this.values[name]
                const error = validate ? validate(value) : null
                this.setFieldError(name, error)
                this.setFieldTouched(name)
                if (error) {
                    hasErrors = true
                }
            })
            return hasErrors
        },
        async handleSubmit() {
            if (Object.keys(this.errors).length > 0 || this.validateAll()) {
                this.formMessage = FormMessage.INVALID
                return
            }

            if (JSON.stringify(this.values) === JSON.stringify(this.defaultValues)) {
                this.formMessage = FormMessage.UNCHANGED
                return
            }

            this.isSubmitting = true
            try {
                await this.onSubmit(structuredClone(this.values))
            } finally {
                this.isSubmitting = false
            }
        },
        reset() {
            this.values = structuredClone(this.defaultValues)
            this.touched = {}
            this.errors = {}
        }
    },
    render(h) {
        const children = this.$scopedSlots.default({
            values: this.values,
            touched: this.touched,
            errors: this.errors,
            isSubmitting: this.isSubmitting,
            handleSubmit: this.handleSubmit,
            reset: this.reset,
            formMessage: this.formMessage,
        })
        return h('form', children)
    }
}

