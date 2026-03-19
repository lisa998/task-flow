const colors = require('./src/assets/theme/colors.json')

module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.vue', './src/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                ...colors,
                // Opacity variants reference CSS variables (defined in main.css)
                'primary-soft': 'var(--color-primary-soft)',
                'primary-muted': 'var(--color-primary-muted)',
                'text': 'var(--color-text)',
                'title': 'var(--color-title)',
                'surface-hover': 'var(--color-surface-hover)',
                'border-subtle': 'var(--color-border-subtle)',
                'overlay-subtle': 'var(--color-overlay-subtle)',
                'overlay-medium': 'var(--color-overlay-medium)',
                'hero-gradient-start': 'var(--color-hero-gradient-start)',
                'hero-gradient-end': 'var(--color-hero-gradient-end)',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    content: [
        "./public/**/*.html",
        "./src/**/*.vue",
    ],
}
