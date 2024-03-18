<template>
  <div>
    <Navbar />
     <div class="container">
      <div class="row mt-4">
        <div class="col text-center">
          <h2>Daftar <b>Menu</b></h2>
        </div>
      </div>
      <div class="row">
        <div class="col">
            <div class="my-1">
            <div class="input-group">
               <input v-model="search" @keyup="searchh" type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Cari Makanan Kesukaanmu.....">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="bi-search "></i>
                  </div>
                </div>
             
            </div>
              </div>
        </div>
      </div>
      <div class="row">
          <div class="col-md-4 mt-4 " v-for="product in products" :key="product.id">
              <Card :product="product" />
            </div>
      </div>
  </div>
  </div>
</template>

<script>
import Card from '@/components/CardProduct.vue'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios';
export default {
  name:'menu',
   components: {
Navbar,
    Card
  },
  data(){
    return{
      products: [],
      search: '',  
    }
  },
    methods:{ 
        setproduct(data){
            this.products = data
        },
        searchh(){
            axios.get('http://localhost:3000/products?q=' + this.search)
            .then((response)=> this.setproduct(response.data))
            .catch((error) => console.log(error))
        }
        
    },
    mounted(){
      axios.get('http://localhost:3000/products')
      .then((response)=> this.setproduct(response.data))
      .catch((error) => console.log(error))
    }
  
}
</script>

<style>

</style>