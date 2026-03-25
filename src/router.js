import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import ProjectsPage from "@/pages/ProjectsPage.vue";
import ProjectDetailPage from "@/pages/ProjectDetailPage.vue";
import ReportsPage from "@/pages/ReportsPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import AppLayout from "@/components/layout/AppLayout.vue";

export const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: AppLayout,
        children: [
            {path: '/dashboard', component: DashboardPage},
            {path: '/projects', component: ProjectsPage},
            {
                path: '/projects/:projectId',
                component: ProjectDetailPage,
                children: [
                    {
                        path: 'tasks',
                        props: true,
                        children: [{
                            path: ':taskId',
                            props: true,
                        }]
                    }
                ]
            },
            {path: '/reports', component: ReportsPage},
            {path: '/settings', component: SettingsPage},
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/login',
        component: LoginPage,
        meta: {
            guestOnly: true,
        }
    },
    {path: '*', component: NotFoundPage},
]