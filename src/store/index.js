import Vue from 'vue';
import Vuex from 'vuex';
import auth from "@/store/modules/auth";
import notifications from "@/store/modules/notifications";
import projects from "@/store/modules/projects";
import tasks from "@/store/modules/tasks";
import ui from "@/store/modules/ui";
import dashboard from "@/store/modules/dashboard";
import toasts from "@/store/modules/toasts";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        notifications,
        projects,
        tasks,
        ui,
        dashboard,
        toasts
    }
})