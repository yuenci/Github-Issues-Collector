import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import ProjectsContainer from './components/ProjectsContainer.vue'
import IssuesContainer from './components/IssuesContainer.vue'
import SettingsContainer from './components/SettingsContainer.vue'



const app = createApp(App)

const routes = [
    { path: '/', component: ProjectsContainer },
    { path: '/repos', component: ProjectsContainer },
    { path: '/issues', component: IssuesContainer },
    { path: '/issues/:repo', component: IssuesContainer },
    { path: '/settings', component: SettingsContainer },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

app.use(router)
app.use(ElementPlus)
app.mount('#app')
