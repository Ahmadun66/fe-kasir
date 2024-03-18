<template>
  
      <div class="card shadow card-product">
        <img class="card-img-top card-prod" :src=" 'images/'+ product.gambar" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{product.nama}}</h5>
            <p class="card-text">Rp.{{product.harga}}</p>
            <router-link :to="'/menu/'+product.id" class="btn btn-success"> 
                <i class="bi-cart"></i>
                 Pesan</router-link>
        </div>
          </div>

</template>

<script>
export default {
    name:'card',
    props:['product']

}

</script>

<style>

</style>