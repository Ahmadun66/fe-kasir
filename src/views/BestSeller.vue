<template>
    <Navbar />
    <div class="container min-vh-100">
        <h5 class="text-center"><b>Most Seller Product</b></h5>
        <div class="pt-3">
            <div v-for="data in Topprod" :key="data" class=" p-3 rounded-3 mt-3"
                style="background-color: rgb(247, 247, 247); border: 2px solid; border-color: rgb(9, 200, 143);">
                <div class="row" >

                    <div class="col-6" style="display: flex; justify-content: space-between; align-items: center;" >
                        <img :src="'../images/' + data.gambar" alt="" width="40%" style="">
                        <h4><b>{{ data.nama }}</b></h4>
                    </div>
                    <div class="col-6"  style="display: flex; justify-content: space-between; align-items: center;">
                        <h4>{{ formatToRupiah(data.harga) }}</h4>
                        <h4>{{ data.terjual }} Terjual</h4>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
export default {
    name: "BestSeller",
    components: {
        Navbar,
    },
    data() {
        return {
            datanya: []
        }
    },
    computed: {

        Topprod() {
            const copiedArray = this.datanya.slice();
            const da = copiedArray.sort((a, b) => b.terjual - a.terjual);
            console.log(da);
            return da
        }

    },
    methods: {
        formatToRupiah(amount) {
            // Format number to Rupiah with comma as a thousand separator
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            }).format(amount);
        },
    },

    mounted() {
        axios.get('http://localhost:3000/products').then(res => {
            this.datanya = res.data
        })


    }
}
</script>