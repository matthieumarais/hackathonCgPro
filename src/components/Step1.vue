<template>
   <div class="container rel">
        <div class="top">
            <h1>Bienvenue</h1>
        </div>
    </div>
</template>
 

<script>
import axios from "axios";
import LineExample from "./LineChart.js";
import { mapGetters, mapMutations } from "vuex";


export default {
  computed: {
    ...mapGetters(["datesGetter", "assetsGetter"])
  },
  name: "step1",
  components: {
    LineExample
  },
  data() {
    return {
      dates: ["2017","2030"],
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
          `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/asset`,
          {
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
        this.getAssets();  // affiche la liste
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
        this.getAssets();  // affiche la liste
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
.padding{
  padding-bottom:20px;
}
.custom-input {
  height: 100px;
}
.margin{
  margin-left:20px;
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
