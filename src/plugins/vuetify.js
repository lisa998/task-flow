import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from '@/assets/theme/colors.json'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: colors,
        },
    }
});
