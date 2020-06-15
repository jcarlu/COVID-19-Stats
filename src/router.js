import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import WorldDistribution from './components/WorldDistribution.vue'
import MIHospital from './components/MIHospital.vue'
import StateBarDist from './components/StateBarDist.vue'
import StateRecoveryRate from './components/StateRecoveryRate.vue'
import MINewCases from './components/MINewCases.vue'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
        requiresAuth: false
        }
    },
    {
    path: '/worldDistribution',
    name: 'worldDistribution',
    component: WorldDistribution,
    meta: {
        requiresAuth: false
        }
    },
    {
    path: '/michiganHospitalizations',
    name: 'michiganHospitalizations',
    component: MIHospital,
    meta: {
        requiresAuth: false
        }
    },
    {
    path: '/casesByState',
    name: 'casesByState',
    component: StateBarDist,
    meta: {
        requiresAuth: false
        }
    },
    {
    path: '/stateRecoveryRate',
    name: 'stateRecoveryRate',
    component: StateRecoveryRate,
    meta: {
        requiresAuth: false
        }
    },
    {
    path: '/michiganNewCases',
    name: 'michiganNewCases',
    component: MINewCases,
    meta: {
        requiresAuth: false
        }
    },
  ]
})


export default router;
