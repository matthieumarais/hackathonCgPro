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
      <router-link v-if='i==3' v-bind:to="page"><button class="btn btn-primary btn2" v-bind:class="{disable:isDisable }" @click="next">Suivant</button></router-link>
<!--       <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  <i class="el-icon-service"></i>
</button> -->
      <el-steps style="margin-top: 50px" :active="active" finish-status="success">
      <el-step title="Bienvenue"></el-step>
      <el-step  title="Simulation"></el-step>
      <el-step  title="Résultat"></el-step>
      </el-steps>
      <!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Contacter un Coach en direct</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    
      <div class="modal-body">
        <p><strong>Thomas Godinho</strong> : Bonjour, je suis Thomas votre coach financier. Vous avez une question ?<p>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
        <div class="input-group">
  <input type="text" class="form-control" placeholder="Votre message..." aria-label="Message" aria-describedby="basic-addon2">
  <span class="input-group-addon" id="basic-addon2"><i class="el-icon-d-arrow-right"></i></span>
</div>
      </div>
    </div>
  </div>
</div>
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
    left: 50%;
    transform: translateX(-50%);
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

  .btn2{
position: absolute;
right: 20px;
bottom: 20px;
  }
</style>
