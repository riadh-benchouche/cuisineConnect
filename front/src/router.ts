import {createMemoryHistory, createRouter} from 'vue-router'
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/HomeView.vue'),
            name: 'home',
            meta: {
                requiresAuth: false
            }
        },
    ],
})
export {router}

