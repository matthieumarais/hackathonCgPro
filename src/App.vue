<template>
  <div id="app">
    <el-header><img src="./assets/logo.png" alt="cgpro.tv"></el-header>
    <el-main>
      <el-row>
        <router-view/>
      </el-row>
    </el-main>
    <el-footer class="grid-content steps">
      <router-link v-bind:to="page"><el-button v-bind:class="{disable:isDisable }" style="margin-bottom: 20px;" @click="next">Next step</el-button></router-link>
      <el-steps :active="active" finish-status="success">
        <el-step title="Step 1" description="Some description"></el-step>
       <el-step  title="Step 2" description="Some description"></el-step>
        <el-step title="Step 3" description="Some description"></el-step>
        <el-step title="Step 4" description="Some description"></el-step>
      </el-steps>
    </el-footer>
  
  </div>
</template>

<script>
  import {
    mapGetters, mapMutations
  } from "vuex";
  
  export default {
        computed: {
      ...mapGetters(['datesGetter'])
    },
    name: 'app',
    data() {
      return {
        isDisable : false,
        active: 0,
        i : 2,
        page : "/step" + 2,
      };
    },
  
    methods: {
      next() {
        if (this.active++ > 3) this.active = 4;
        if (this.i > 3) this.isDisable = true;
        this.i++
        this.page = "/step" + this.i
        return this.page
        this.$store.commit('storeAssets', this.choosenAssets)
      },
    }
  }
</script>

<style>
  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  
  .el-header {
    background-color: #36abd7;
  }
  
  .steps {
    position: fixed;
    bottom: 100px;
    width: 100%;
  }

  .disable{
    pointer-events: none;
    opacity: 0.7;
  }
</style>
