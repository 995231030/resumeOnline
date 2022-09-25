import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
const mainPage = () => import("../components/mainPage.vue")
const loginRegister = () => import("../components/loginRegister")
const onePage = () => import("../components/onePage")

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
    },
    {
        path: "/onePage",
        name: "onePage",
        component: onePage,
        meta: {
            keepAlive: true
        }
    }
]
const router = createRouter({
    history: createWebHistory(), //vue3的这种写法貌似没有刷新404的问题
    routes: routes
})
export default router