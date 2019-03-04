import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/Index";
import Post from "@/components/Post";
import Login from "@/components/Login";
import Edit from "@/components/Edit";
import About from "@/components/About";
import Contact from "@/components/Contact";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/onTag',
      name: 'onTag',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/new',
      name: 'New',
      component: Edit
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    { path: '/404', component: Index },
    { path: '*', redirect: '/404' },
  ]
})
// router.replace({ path: '/*', redirect: '/' })
export default router
