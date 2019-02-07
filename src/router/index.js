import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import HistoryComponent from '@/components/History'
import Login from '@/components/Login';
import NavDrawer from '@/components/NavDrawer';
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login,
            // props: true
        },
        {
            path: '/home',
            name: 'home',
            component: NavDrawer,
            // props: true,
            children: [
                {
                    path: 'history',
                    component: HistoryComponent
                },
                {
                    path: 'profile',
                    component: Profile
                },  
                {
                    path: '',
                    components: {
                        default: Home,
                        innerRoute: Home
                    }
            }]
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        }
    ]
})