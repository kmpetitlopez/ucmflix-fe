import Vue from 'vue'
import Router from 'vue-router'
import { MainScreen, NotFoundScreen, 
    HomePageScreen, SectionScreen, 
    DetailScreen, MasterScreen, 
    LoginScreen, SignUpScreen, RecoveryPasswordScreen,
    PasswordScreen } from '@/screens'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainScreen,
            children: [
                {
                    path: '/',
                    component: HomePageScreen,
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: LoginScreen,
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignUpScreen,
        },
        {
            path: '/password-confirmation',
            name: 'password-confirmation',
            component: PasswordScreen,
        },
        {
            path: '/recovery-password',
            name: 'recovery-password',
            component: RecoveryPasswordScreen,
        },
        {
            path: '*',
            name: '404',
            component: NotFoundScreen,
        },
        {
            path: '/section/:id',
            name: 'section',
            component: SectionScreen,
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: DetailScreen,
        },
        {
            path: '/master/:id',
            name: 'master',
            component: MasterScreen,
        }
    ],
})

export default router
