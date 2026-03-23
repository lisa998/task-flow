export default {
    name: "FormField",
    props: {
        name: {
            type: String,
            required: true,
        },
        validate: {
            type: Function,
            required: false,
        }
    },
    inject: ['formContext'],
    computed: {
        field() {
            const formContext = this.formContext
            const name = this.name
            return {
                name,
                state: formContext.getFieldState(name),
                handleChange: (value) => {
                    formContext.setFieldValue(name, value)
                },
                handleBlur: () => {
                    formContext.setFieldTouched(name)
                    if (this.validate) {
                        const value = formContext.getFieldState(name).value
                        const error = this.validate(value)
                        formContext.setFieldError(name, error)
                    }
                }
            }
        }
    },
    mounted() {
        this.formContext.registerField(this.name, this.validate)
    },
    beforeDestroy() {
        this.formContext.unregisterField(this.name)
    },
    render() {
        return this.$scopedSlots.default({
            field: this.field
        })[0]
    }
}

