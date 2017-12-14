<template>
  <div>
    <el-row>
      <el-col :span="14">
        <div class="grid-content left-content">
           <el-date-picker
    v-model="dates[0]"
    type="year"
    placeholder="Pick a year">
  </el-date-picker>
   <el-date-picker
    v-model="dates[1]"
    type="year"
    placeholder="Pick a year">
  </el-date-picker>
          <br>
          <el-select v-model="chosenIndex" placeholder="Choisissez un placement">
            <el-option v-for="(item, index) in assets" :key="item.id" :label="item.name" :value="index">
            </el-option>
          </el-select>
          <el-button v-on:click="addAsset()" type="info"><i class="el-icon-circle-plus-outline"></i></el-button>
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
    </el-row>
  </div>
</template>

<script>
  import axios from "axios";
  
  import {
    mapGetters, mapMutations
  } from "vuex";
  
  export default {
    computed: {
      ...mapGetters(['datesGetter','assetsGetter'])
    },
    name: "Step1",
    data() {
      return {
        dates: [],
        chosenIndex: '',
        assets: [],
        errors: [],
      }
    },
    methods: {
      addAsset () {
        this.$store.commit('storeAssets', this.assets[this.chosenIndex])
        this.$store.commit('storeDates', this.dates)
      },
    },
    
  
  
    // Fetches posts when the component is created.
    async created() {
      try {
        const response = await axios.get(
          /* `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/1/asset` */
          `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/asset/model`
        );
        this.assets = response.data;
      } catch (e) {
        this.errors.push(e);
      }
    },
  
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
