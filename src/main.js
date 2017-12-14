// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import moment from 'moment'
import Vuex from 'vuex'
import store from './store'

Vue.use(ElementUI, { locale })
Vue.use(Vuex)
Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router,
    components: { App }
})