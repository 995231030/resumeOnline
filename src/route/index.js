import { createRouter, createWebHashHistory } from "vue-router";
const mainPage = () => import("../components/mainPage.vue")
const loginRegister = () => import("../components/loginRegister")

const routes = [
    { path: "/", redirect: "/mainPage" },
    {
        path: "/mainPage",
        name: "mainPage",
        component: mainPage
    },
    {
        path: "/loginRegister",
        name: "loginRegister",
        component: loginRegister
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router