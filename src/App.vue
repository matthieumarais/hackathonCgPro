<template>
  <div id="app">
    <el-header><img src="./assets/logo.png" alt="cgpro.tv"></el-header>
    <el-main style="padding:0">
      <el-row class="toto">
        <router-view/>
      </el-row>
    </el-main>
    <el-footer class="grid-content steps">
      <router-link v-if='i<3' v-bind:to="page"><button class="btn1 btn" v-bind:class="{disable:isDisable }" @click="next">Démarrer votre simulation</button></router-link>
      <router-link v-if='i>=3' v-bind:to="page"><button class="btn2 btn" v-bind:class="{disable:isDisable }" style="margin-bottom: 20px;" @click="next">Next step</button></router-link>
      <el-steps style="margin-top: 50px" :active="active" finish-status="success">
      <el-step title="Bienvenue" description="Some description"></el-step>
      <el-step  title="Simulation" description="Some description"></el-step>
      <el-step  title="Résultat" description="Some description"></el-step>
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
        if (this.active++ > 2) this.active = 3;
        if (this.i > 2) this.isDisable = true;
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

  .disable{
    pointer-events: none;
    opacity: 0.7;
  }
  .toto{
        padding-bottom: 50px;
  }
  .btn1{
    cursor: pointer;
    top: 39%;
    left: 694px;
    position: absolute;
    background-color:#00A5DA;
     color:#fff; font-size:20px;
      padding:20px 10px
  }
  .btn1:hover{
    color:#fff;
    background-color: transparent;
    border:solid 1px #36abd7;
  }
</style>
