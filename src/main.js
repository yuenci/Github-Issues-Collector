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
    { path: '/repos', component: ProjectsContainer },
    { path: '/issues', component: IssuesContainer },
    { path: '/settings', component: SettingsContainer },
]

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router)
app.use(ElementPlus)
app.mount('#app')
