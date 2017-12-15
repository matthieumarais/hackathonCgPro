<template>
    <div class="container rel">
        <div class="top">
            <h1>Merci pour votre confiance</h1>
            <div class="row">
                <div class="col-md-4">
                    <button class="btn" aria-label="Left Align">Télecharger(.pdf)</button>
                </div>
                <div class="col-md-4">
                    <button class="btn" aria-label="Left Align">Envoyer</button>
                </div>
                <div class="col-md-4">
                    <button class="btn" aria-label="Left Align">imprimer</button>
                </div>
            </div>
           <router-link :to="{ path: '/' }"> <button class="btn simu">Refaire une simulation</button></router-link>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from "vuex";
    export default {
        computed: {
            ...mapGetters(["datesGetter", "assetsGetter"])
        },
        name: "Step3",

        methods: {
        }
    };
</script>

<style>
    .rel {
        position: relative;
        height:70vh;
    }
    .btn{
        cursor: pointer;
        width:160px;
        padding:10px 0;
        background-color: #00A5DA;
        font-size: 18px;
        color:#fff;
    }
    .simu{
        margin-top: 200px;
        width:250px;
    }
    .top {
        position: absolute;
        top: 40%;
        left: 0;
        right: 0;
        text-align: center;
        transform: translateY(-50%);
    }
    
    h1 {
        padding-bottom: 200px;
    }
</style>
