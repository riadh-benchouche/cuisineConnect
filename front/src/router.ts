import {createWebHistory, createRouter} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('./views/HomeView.vue'),
            name: 'home',
            meta: {
                requiresAuth: false
            }
        },
        // TODO: Add routes for login, register, profile and recipe
        {
            path: '/login',
            component: () => import('./views/HomeView.vue'),
            name: 'login',
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            component: () => import('./views/HomeView.vue'),
            name: 'register',
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/profile',
            component: () => import('./views/HomeView.vue'),
            name: 'profile',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/recipe/:id',
            component: () => import('./views/RecipeDetail.vue'),
            name: 'recipe',
            meta: {
                requiresAuth: false
            }
        }
    ],
})
router.beforeEach((to, from, next) => {
    // Redirect to login if route requires auth and user is not logged in
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        next({name: 'login'})
    } else {
        next()
    }
})
export {router}

