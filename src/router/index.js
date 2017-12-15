import Vue from 'vue'
import Router from 'vue-router'
import step1 from '@/components/Step1'
import step2 from '@/components/Step2'
import end from '@/components/end'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'step1',
            component: step1
        },
        {
            path: '/step2',
            name: 'step2',
            component: step2
        },
        {
            path: '/step3',
            name: 'end',
            component: end
        },
    ]
})