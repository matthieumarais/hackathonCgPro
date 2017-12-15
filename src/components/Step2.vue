<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="Résumé" name="1">
            <el-row>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix titlebox">
                    <span>Ratio de Liquidité</span>
                  </div>
                  <div class="text item textbox" style="color : red">
                    {{this.simulation[this.simulation.length - 1].averageLiquidity}}
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix titlebox">
                    <span>Risque moyen</span>
                  </div>
                  <div class="text item textbox" style="color : green">
                    {{this.simulation[this.simulation.length - 1].averageRisk}}
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
  
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix titlebox">
                    <span>Montant total cumulé</span>
                  </div>
                  <div class="text item textbox">
                    {{Math.round(this.simulation[this.simulation.length - 1].totalAccumulatedAmount.reduce(function(pv, cv) { return pv + cv; }, 0))| currency }} €
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix titlebox">
                    <span>Total des revenus cumulé</span>
                  </div>
                  <div class="text item textbox">
                    {{Math.round(this.simulation[this.simulation.length - 1].totalIncomeAmount.reduce(function(pv, cv) { return pv + cv; }, 0)) | currency }} €
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
        <div style="padding-left:20px;"class="grid-content">
          <div style="width:100%">
            <el-date-picker v-model="dates[0]" type="year" placeholder="Pick a year">
            </el-date-picker>
            <el-date-picker v-model="dates[1]" type="year" placeholder="Pick a year">
            </el-date-picker>
          </div>
          <br>
          <el-select v-model="chosenIndex" placeholder="Choisissez un placement" style="width:100%">
            <el-option v-for="(item, index) in models" :key="item.id" :label="item.name" :value="index">
            </el-option>
          </el-select>
          <div style="display: inline-block;margin-top: 25px; width:100%">
            <el-input placeholder="Montant" v-model="amount">
              <template slot="append"><el-button v-on:click="addAsset()" type="info">+</el-button></template></el-input>
    
        </div>
        </div>
        
        <div>
         <div style="text-align:center; margin-top : 25px;"class="padding">
          {{dates[0] | formatDate}} - {{dates[1] | formatDate}}
          </div>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Montant</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr class="padding" v-for="(item, index) in assets">
      <th scope="row">{{item.name}}</th>
      <td>{{item.amount | currency }} €</td>
      <td><button class="margin" v-on:click="deleteAsset(item.idAsset)"><i class="el-icon-error"></i></button></td>
    </tr>
  </tbody>
          </table>
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
    name: "step2",
    components: {
      LineExample
    },
    data() {
      return {
        dates: ["2017", "2030"],
        chosenIndex: "",
        simulation: [],
        errors: [],
        choosenAssets: [],
        activeName: "2",
        models: [],
        assets: [],
        amount: "",
        // label:[]
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
            `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/asset`, {
              idAssetModel: this.models[this.chosenIndex].idAssetModel,
              idUser: 1,
              name: this.models[this.chosenIndex].name,
              amount: this.amount,
              start: null,
              end: null,
              rate: 0.05
            }
          );
          this.getSimu(); // lance la simu
          this.getAssets(); // affiche la liste
          this.$store.commit("storeDates", this.dates);
  
        } catch (e) {
          this.errors.push(e);
        }
      },
      async getSimu() {
        try {
          const response = await axios.get(
            `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/1/simulation?start=${this.dates[0]}&end=${this.dates[1]}`
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
        } catch (e) {
          this.errors.push(e);
        }
      },
      async deleteAsset(id) {
        try {
          const response = await axios.delete(
            `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/asset/` +
            id
          );
          console.log("deleted");
          this.getSimu(); // lance la simu
          this.getAssets(); // affiche la liste
        } catch (e) {
          this.errors.push(e);
        }
      }
    },
  
    // Fetches posts when the component is created.
    created() {
      this.getSimu();
      this.getModels();
      this.getAssets();
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

  .textbox{
    font-size:28px;
    font-weight: 400

  }

  .titlebox{
    font-size: 16px;
  }
  
  .padding {
    padding-bottom: 20px;
  }
  
  .custom-input {
    height: 100px;
  }
  
  .margin {
    margin-left: 20px;
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
