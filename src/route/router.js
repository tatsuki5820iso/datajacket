import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes=[
	{ path: '', name: 'home', component: () => import("../components/Home") },
	{ path: 'contact', name: 'contact', component: () => import("../components/Contact") },
	{ path: 'search', name: 'search', component: () => import("../components/Search") },
]

const router=new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes,
})

export default router
