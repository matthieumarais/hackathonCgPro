<template>
<p>test</p>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Step2",
    data() {
      return {
        dates: [],
        chosenIndex: '',
        assets: [],
        errors: [],
        choosenAssets: [],
      }
    },
    methods: {
      addAsset: function() {
        this.choosenAssets.push(this.assets[this.chosenIndex])
        console.log(this.choosenAssets)
      },
    },
  
    // Fetches posts when the component is created.
    async created() {
      try {
        const response = await axios.get(
          `https://ulnjbgo4dl.execute-api.eu-central-1.amazonaws.com/dev/hackaton/user/1/asset`
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
