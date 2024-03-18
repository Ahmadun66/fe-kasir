<template>
  <nav class="navbar navbar-expand-lg navbar-light ">
      <div class="container">
    
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <img src="../../public/logo.png" class="" style="width: 60px;"  href="/"/>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
        <ul class="navbar-nav  mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
              <router-link class="nav-link" to="/menu">Menu</router-link>
          </li>
          <li class="nav-item">
              <router-link class="nav-link" to="/bestseller">Best Seller</router-link>
          </li>
        </ul>
      
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/keranjang">Keranjang
              <i class="bi-cart"></i>
              <span class="badge bg-success " style="margin-left:10px" >{{ update ? update.length : jumlah_pesanan.length}}</span>
            </router-link>
          </li>
      
        </ul>
       
      </div>
    </div>
  
  </nav>
  </template>

<script>
import axios from "axios"
export default {
  name: "navbar",
  props: ['update'],
  data(){
    return{
      jumlah_pesanan: [],
    }
  },
  methods: {
    setjumlah(data){
      this.jumlah_pesanan = data
    }
  },
  mounted(){
    axios
    .get('http://localhost:3000/keranjangs/')
      .then((response)=> this.setjumlah(response.data))
      .catch((error) => console.log(error))
  }
}
</script>

<style>

</style>