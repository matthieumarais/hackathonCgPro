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
      <el-col :span="8">
        <div class="grid-content">
          <el-date-picker v-model="dates[0]" type="year" placeholder="Pick a year">
          </el-date-picker>
          <el-date-picker v-model="dates[1]" type="year" placeholder="Pick a year">
          </el-date-picker>
          <br>
          <el-select v-model="chosenIndex" placeholder="Choisissez un placement">
            <el-option v-for="(item, index) in models" :key="item.id" :label="item.name" :value="index">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 15px;">
          <el-input placeholder="Montant" v-model="amount">
            <template slot="append">€
</template>
  </el-input>
</div>
          <el-button v-on:click="addAsset()" type="info"><i class="el-icon-circle-plus-outline"></i></el-button>
          <el-button v-on:click="deleteAsset()" type="info"><i class="el-icon-circle-minus-outline"></i></el-button>
          
        <div>
          {{dates[0] | formatDate}} - {{dates[1] | formatDate}}
          <div v-for="(item, index) in assets">{{item.name}}: {{item.amount}}€</div>
        </div>
      </el-col>
    </el-row>
  </div>
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
        activeName: "2",
        models: [],
        assets: [],
        amount: ""
      };
    },
  
    methods: {
      addChartsData() {
        this.$store.commit("storeChartsData", [
          this.simulation[this.simulation.length - 1].totalAccumulatedAmount,
          this.simulation[this.simulation.length - 1].totalIncomeAmount
        ]);
      },
      async addAsset() {
 try {
          const response = await axios.post(
            `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/asset`, {idAssetModel: this.models[this.chosenIndex].idAssetModel, idUser: 1, name: this.models[this.chosenIndex].name, amount: this.amount, start : null, end : null, rate: 0.05}
          );
         /*  this.addChartsData(); */
        } catch (e) {
          this.errors.push(e);
        }
       /*  this.$store.commit("storeAssets", this.assets[this.chosenIndex]);
        this.$store.commit("storeDates", this.dates); */
      },
      async getSimu() {
        try {
          const response = await axios.get(
            `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/1/simulation?start=2017&end=2045`
          );
          this.simulation = response.data;
          console.log("simulation", this.simulation);
          this.addChartsData();
        } catch (e) {
          this.errors.push(e);
        }
      },
      async getModels() {
        try {
          const response = await axios.get(
            `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/asset/model`
          );
          this.models = response.data;
          console.log("models", this.models);
          this.addChartsData();
        } catch (e) {
          this.errors.push(e);
        }
      },
      async getAssets() {
        try {
          const response = await axios.get(
            `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/1/asset`
          );
          this.assets = response.data;
          console.log("assets", this.assets);
          this.addChartsData();
        } catch (e) {
          this.errors.push(e);
        }
      },
      async deleteAsset() {
        try {
          const response = await axios.delete(
            `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/asset/52`
          );
          console.log("deleted");
        } catch (e) {
          this.errors.push(e);
        }
      }
    },
  
  
    // Fetches posts when the component is created.
    created() {
      this.getSimu();
      this.getModels();
      this.getAssets()
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
