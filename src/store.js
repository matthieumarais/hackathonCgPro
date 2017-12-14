import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    storeDates: [],
    storeChosenIndex: '',
    storeAssets: [],
    storeErrors: [],
    storeChoosenAssets: [],
},

 mutations = {
    storeAssets: (state, payload) => {
        state.storeChoosenAssets.push(payload);
    },
    storeDates: (state, payload) => {
        state.storeDates[0] = payload ;
    } 
            
}
    

const getters = {
    datesGetter: state => state.storeDates,
    assetsGetter: state => state.storeChoosenAssets
}

const actions = {

}

export default new Vuex.Store({
    state: state, mutations: mutations, getters: getters, actions: actions
})