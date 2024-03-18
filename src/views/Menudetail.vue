<template>
  <div>
<Navbar />
      <div class="container">
      <div class="row mt-3">
          <div class="col">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/" class="text-dark" style="text-decoration: none;" >Home</router-link>
                     </li>
                    <li class="breadcrumb-item">
                        <router-link to="/menu" class="text-dark"  style="text-decoration: none;"  >Menu</router-link>
                     </li>
                    <li class="breadcrumb-item active" aria-current="page">Menu Order
                     </li>
                </ol>
                </nav>
          </div>
          <div class="row">
              <div class="col-md-8 ">
                  <img :src=" '../images/'+product.gambar" class="image-fluid shadow  " alt="">
              </div>
              <div class="col-md-4">
                  <h2><strong>{{product.nama}}</strong></h2>
                  <hr>
                  <h4>Harga : <strong>{{product.harga}}</strong> </h4>
                  <form action="" v-on:submit.prevent>
                      <div class="form-group mt-2">
                          <label for="jumlah_pemesanan">Jumlah Pesan</label>
                          <input type="number" class="form-control" v-model="pesan.jumlah_pemesanan" />
                      </div>
                      <div class="form-group mt-2">
                          <label for="keterangan">Keterangan</label>
                            <textarea v-model="pesan.keterangan" class="form-control" placeholder="Keterangan spt : Pedes, Setengah pedes..."></textarea>
                      </div>
                      <button type="submit" class="btn btn-success mt-2" @click="pemesanan">
                        <i class="bi-cart"></i>
                          Pesan</button>
                      
                  </form>
              </div>
          </div>
      </div>

  </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue'
export default {
    nama: 'detail',
    components:{Navbar},
  
    data(){
        return{
            product: {},
            pesan: {}
        }
    },
    methods:{
        setproduct(data){
        this.product = data
        },
        pemesanan(){
           if(this.pesan.jumlah_pemesanan){
                this.pesan.products = this.product
            axios
            .post('http://localhost:3000/keranjangs', this.pesan)
            .then(() => {
                this.$router.push({path:"/keranjang"})
                this.$toast.success('Sukses Masuk keranjang', {
                    type: 'success',
                    position: 'top-right',
                    duration: 3000,
                    dismissible: true
                 })
            })
            .catch((err) =>{
                console.log(err)
            })
           }else {
                this.$toast.error('Jumlah Pesanan Harus diisi', {
                    type: 'error',
                    position: 'top-right',
                    duration: 3000,
                    dismissible: true
                 })
           }
        }
    },
    mounted(){
     axios
    .get('http://localhost:3000/products/'+this.$route.params.id)
      .then((response)=> this.setproduct(response.data))
      .catch((error) => console.log(error))
    }
}
</script>

<style>
.breadcrumb-item.active{
    font-weight: bold;
}

</style>