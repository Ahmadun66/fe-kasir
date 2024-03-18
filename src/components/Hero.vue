<template>
 <div class="d-none d-md-block ">
      <div class="row">
            <div class=" col-md-5">
                <div class="d-flex flex-column  h-100 justify-content-center ">
                        <h2><strong>Makan enak, </strong> <br> Obat lapar Kamu</h2>
                        <p>Ayo segera pesan makanan favorit anda</p>
                        <div class="d-flex">
                            <router-link class=" btn btn-md btn-success " style="" to="/menu">Pesan
                                <i class="bi-arrow-right-short " ></i>
                            </router-link>
                        </div>
                </div>
            </div>
            <div class="col-md-7">
                <img src="hero.png" alt="" width="700">
            </div>
        </div>
 </div>
 <div class="d-sm-block d-md-none">
      <div class="row">
          <div class="col-md-7  d-flex justify-content-center">
        <img src="hero.png" alt="" width="700">
      </div>
      <div class="col-md-5">
          <div class="d-flex flex-column  h-100 justify-content-center ">
                <h2><strong>Makan enak, </strong> <br> Obat lapar Kamu</h2>
                <p>Ayo segera pesan makanan favorit anda</p>
                <div class="d-flex">
                      <router-link class=" btn btn-md btn-success " style="" to="/">Pesan
                        <i class="bi-arrow-right-short " ></i>
                       </router-link>
                </div>
          </div>
      </div>
      
  </div>
 </div>
</template>

<script>
export default {
    name: 'Hero'
}
</script>

<style>


</style>