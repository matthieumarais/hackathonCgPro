import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Api from '@/components/Api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: HelloWorld
        },
        {
            path: '/api',
            component: Api
        }
    ]
})