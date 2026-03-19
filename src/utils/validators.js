export const validateCollection = (schema = {}) => (value) =>
    Array.isArray(value) &&
    value.every((item) =>
        Object.entries(schema).every(([key, expectedType]) => typeof item[key] === expectedType)
    )

