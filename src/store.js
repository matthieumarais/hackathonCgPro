import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

var state = {
        storeDates: [],
        storeChosenIndex: '',
        storeAssets: [],
        storeErrors: [],
        storeChoosenAssets: [],
        storeChartsData: []
    },

    mutations = {
        storeAssets: (state, payload) => {
            state.storeChoosenAssets.push(payload);
        },
        storeDates: (state, payload) => {
            state.storeDates[0] = payload;
            state.storeDates[0][0] = moment(state.storeDates[0][0]).format("YYYY");
            state.storeDates[0][1] = moment(state.storeDates[0][1]).format("YYYY");
        },
        storeChartsData: (state, payload) => {
            state.storeChartsData[0] = payload;
        }

    }


const getters = {
    datesGetter: state => state.storeDates,
    assetsGetter: state => state.storeChoosenAssets,
    chartsGetter: state => state.storeChartsData
}

const actions = {

}

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
})