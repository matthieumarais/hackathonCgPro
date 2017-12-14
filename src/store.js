import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    storeDates: '1',
    storeChosenIndex: '',
    storeAssets: [],
    errors: [],
    choosenAssets: [],
},

    mutations = {
        getApi: function () { }
    }

const getters = {
    datesGetter: state => state.storeDates
}

const actions = {

}

export default new Vuex.Store({
    state: state, mutations: mutations, getters: getters, actions: actions
})