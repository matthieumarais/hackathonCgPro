import { Line } from 'vue-chartjs'
import {
    mapGetters,
    mapMutations
} from "vuex";

export default {
    computed: {
        ...mapGetters(['chartsGetter'])
      },
    extends: Line,
    mounted () {

    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Montant total cumulé',
          borderColor: 'red',
          fill: false,
          data: this.chartsGetter[0][0]
        },{
          label: 'Total des revenus cumulé',
          borderColor: '#05CBE1',
          fill: false,
          data: this.chartsGetter[0][1]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  },
}