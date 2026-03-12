module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.vue', './src/**/*.js'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#43a08c',
                primaryLight: '#e0f2f1',
                title: '#000000DE',
                text: '#00000099',
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
