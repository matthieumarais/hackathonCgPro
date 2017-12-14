<template>
    <div>
        <el-row>
            <el-col :span="16">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="Résumé" name="1">
                        <el-row>
                            <el-col :span="12">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>Ratio de Liquidité</span>
                                    </div>
                                    <div class="text item">
                                        {{this.simulation[this.simulation.length - 1].averageLiquidity}}
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>Risque moyen</span>
                                    </div>
                                    <div class="text item">
                                        {{this.simulation[this.simulation.length - 1].averageRisk}}
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row>
    
                            <el-col :span="12">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>Montant total cumulé</span>
                                    </div>
                                    <div class="text item">
                                        {{Math.round(this.simulation[this.simulation.length - 1].totalAccumulatedAmount.reduce(function(pv, cv) { return pv + cv; }, 0))}}
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>Total des revenus cumulé</span>
                                    </div>
                                    <div class="text item">
                                        {{Math.round(this.simulation[this.simulation.length - 1].totalIncomeAmount.reduce(function(pv, cv) { return pv + cv; }, 0))}}
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="Graphique" name="2">
                        <line-example>
                        </line-example>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
    </div>
    
    <!--  <el-row>
                        <el-col :span="24">
                            <div class="grid-content left-content">
                                <line-example>
                                </line-example>
                            </div>
                            <div>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="grid-content right-content">
                                {{dates[0] | formatDate}} - {{dates[1] | formatDate}}
                                <div v-for="(item, index) in assetsGetter">{{item.name}}: {{item.amount}}€</div>
                            </div>
                        </el-col>
                    </el-row> -->
    </div>
</template>

<script>
    import axios from "axios";
    import LineExample from "./LineChart.js";
    import {
        mapGetters,
        mapMutations
    } from "vuex";
    
    export default {
        computed: {
            ...mapGetters(["datesGetter", "assetsGetter"])
        },
        name: "Step2",
        components: {
            LineExample
        },
        data() {
            return {
                dates: [],
                chosenIndex: "",
                simulation: [],
                errors: [],
                choosenAssets: [],
                activeName: "2"
            };
        },
        methods: {
            addChartsData() {
                this.$store.commit('storeChartsData', 
                [this.simulation[this.simulation.length - 1].totalAccumulatedAmount,
                this.simulation[this.simulation.length - 1].totalIncomeAmount])
            },
        },
    
        // Fetches posts when the component is created.
        async created() {
            try {
                const response = await axios.get(
                    `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/1/simulation?start=2017&end=2045`
                );
                this.simulation = response.data;
                console.log(this.simulation[this.simulation.length - 1]);
                this.addChartsData();
            } catch (e) {
                this.errors.push(e);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    
    .custom-input {
        height: 100px;
    }
    
    .grid-content {
        min-height: 36px;
    }
    
    .left-content {
        border-right: solid 1.5px lightgrey;
        text-align: center;
    }
    
    .right-content {
        padding: 10px;
    }
</style>
