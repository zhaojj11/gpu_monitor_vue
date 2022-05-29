import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import * as VueRouter from 'vue-router'
import GPUMachines from "@/components/gpu/GPUMachines";
import GPU from "@/components/gpu/GPU";

loadFonts()
const routes = [
    {path: '/', component: GPUMachines},
    {path: '/gpu', component: GPU},
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})
createApp(App)
    .use(vuetify).use(router)
    .mount('#app')
