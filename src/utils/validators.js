export const validateCollection = (schema = {}) => (value) =>
    Array.isArray(value) &&
    value.every((item) =>
        Object.entries(schema).every(([key, expectedType]) => typeof item[key] === expectedType)
    )

export const inputValidators = {
    required: {
        fn: value => (value && typeof value === 'string'),
        error: 'This field is required.'
    },
    email: {
        fn: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        error: 'Please enter a valid email address.'
    },
    password: {
        fn: value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
        error: 'Password must be at least 8 characters long and contain both letters and numbers.'
    },
    minLength: {
        fn: (value, len) => (typeof value === 'number' || typeof value === 'string') && value?.length >= len,
        error: len => `Minimum length is ${len} characters.`
    },
    maxLength: {
        fn: (value, len) => (typeof value === 'number' || typeof value === 'string') && value?.length <= len,
        error: len => `Maximum length is ${len} characters.`
    },
}

export const inputValidate = (value, rules) => {
    for (const rule of rules) {
        const [ruleName, ruleParam] = typeof rule === 'string' ? [rule, null] : rule;
        if (!inputValidators[ruleName]) {
            return
        }
        const {fn, error} = inputValidators[ruleName];
        if (!fn(value, ruleParam)) {
            return typeof error === 'function' ? error(ruleParam) : error;
        }
    }
}