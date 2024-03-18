<template>
  <div class="home">
    <Navbar />
     <div class="container">
        <Hero />
        <div class="row">
          <div class="col-6">
            <h2>Menu <strong>Terlaris</strong> Saat Ini</h2>
          </div>
          <div class="col-6">
            <router-link to="/menu" class="btn btn-success " style="float: right"> 
              <i class="bi-filter-circle-fill"></i>
            Lihat Semua</router-link>
          </div>
          <div class="row mb-5">
            <div class="col-md-4 mt-4 " v-for="product in products" :key="product.id">
              <Card  :product="product" />
            </div>
           
          </div>
        </div>
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import Card from '@/components/CardProduct.vue'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero,
    Card
  },
      data(){
        return{
            products: []
        }
    },
    methods:{ 
        setproduct(data){
            this.products = data
        }
    },
    mounted(){
      axios.get('http://localhost:3000/best-products')
      .then((response)=> this.setproduct(response.data))
      .catch((error) => console.log(error))
    }
}
</script>
