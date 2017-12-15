<template>
    <div class="container rel">
        <div class="top">
            <h1>Merci pour votre confiance</h1>
            <div class="row">
                <div class="col-md-6 left">
                    <button class="btn btn-secondary" aria-label="Left Align"><i class="el-icon-download"></i> Télecharger le PDF</button>
                    <br> <div class="or">ou</div>
                    <button class="btn btn-secondary" aria-label="Left Align"><i class="el-icon-printer"></i> Imprimer</button>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-primary email" aria-label="Left Align"><i class="el-icon-message"></i> Envoyer par email</button>
                </div>
            </div>
            <br>
           <div class="retry"><a href="http://localhost:8080/"><i class="el-icon-refresh"></i> Recommencer</a></div>
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
        font-size: 18px;
        color:#fff;
         cursor: pointer;
        width:200px;
        padding:10px 0;
    }
    .btn-primary{
    
        background-color: #00A5DA;

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
        margin-top : 40px;
       margin-bottom: 60px;
    }
.or{
    margin-top: 20px;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color : grey;
}
    .retry{
        margin-top :40px;
    }
a{
    color: #00A5DA;
}
    .email{
        margin-top: 45px
    }

    .left{
            border-right: 1px solid lightgrey;
    }
</style>
