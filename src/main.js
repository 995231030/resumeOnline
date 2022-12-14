import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index'
import store from './store/index.js'
import jsonpath from 'jsonpath'
// import axios from 'axios' 他妈的vue3好像自带axios
// import toast from './utils/showTip.js'

const app = createApp(App)
// app.use(axios)
app.use(router)
app.use(store)
app.use(jsonpath)
// app.use(toast)
app.mount('#app')
