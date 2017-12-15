import { Line, mixins } from 'vue-chartjs'
import {
    mapGetters,
    mapMutations
} from "vuex";

const { reactiveData } = mixins

export default {
    mixins: [reactiveData],
    props: ['options'],
    computed: {
        ...mapGetters(['chartsGetter'])
    },
    extends: Line,
    created() {
        this.fillData()
    },

    mounted() {
        this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false })

        setInterval(() => {
            this.fillData()
        }, 1000)
    },

    methods: {
        fillData() {
            this.chartData = {
                labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
                datasets: [{
                    label: 'Montant total cumulé',
                    borderColor: 'red',
                    fill: false,
                    data: this.chartsGetter[0][0]
                }, {
                    label: 'Total des revenus cumulé',
                    borderColor: '#05CBE1',
                    fill: false,
                    data: this.chartsGetter[0][1]
                }]
            }
        },
        
        updateData() {
            chart.update();
        },
        removeData(chart) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
            chart.update();
        }
    },
    watch: {
        data: function () {
          this._chart.destroy()
          this.renderChart(this.data)
        }
      }
}
    