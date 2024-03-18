<template>
  <div>
    <Navbar :update="keranjangs" />
    <div class="container">
      <div class="row mt-3">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark" style="text-decoration: none;">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/menu" class="text-dark" style="text-decoration: none;">Menu</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Keranjang
              </li>
            </ol>
          </nav>
        </div>
        <div class="row">
          <div class="col">
            <h2>Keranjang <strong>Kamu</strong></h2>
            <div class="table-responsive mt-3">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Makanan</th>
                    <th scope="col">Keterangan</th>
                    <th scope="col">Jumlah</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Total Harga</th>
                    <th scope="col">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                    <th>{{ index + 1 }}</th>
                    <td>
                      <img :src="'../images/' + keranjang.products.gambar" class="img-fluid shadow" width="250" />
                    </td>
                    <td><strong>{{ keranjang.products.nama }}</strong></td>
                    <td>{{ keranjang.keterangan ? keranjang.keterangan : "-" }}</td>
                    <td>{{ keranjang.jumlah_pemesanan }}</td>
                    <td align="right">Rp. {{ keranjang.products.harga }}</td>
                    <td align="right">Rp. {{ keranjang.products.harga * keranjang.jumlah_pemesanan }}</td>
                    <td align="center" class="text-danger">
                      <i class="bi-trash" @click="hapuskeranjang(keranjang.id)"></i>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6" align="right">
                      <strong>Total Harga : </strong>
                    </td>
                    <td align="right">
                      <strong>{{ formatToRupiah(totalharga) }}</strong>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama :</label>
              <input type="text" class="form-control" v-model="pesan.nama" />
            </div>
            <div class="form-group mt-2">
              <label for="noMeja">Nomor Meja :</label>
              <input type="number" class="form-control" v-model="pesan.noMeja" />
            </div>

            <button type="submit" class="btn btn-success float-right mt-2" @click="checkout">
              Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Navbar from '@/components/Navbar.vue'
export default {
  name: "keranjang",
  components: { Navbar },
  data() {
    return {
      keranjangs: [],
      pesan: {}
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
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    hapuskeranjang(id) {
      axios
        .delete("http://localhost:3000/keranjangs/" + id)
        .then(() => {
          this.$toast.error('Sukses dihapus', {
            type: 'error',
            position: 'top-right',
            duration: 3000,
            dismissible: true
          })
          //  update data keranjang
          axios
            .get("http://localhost:3000/keranjangs")
            .then((response) => this.setKeranjangs(response.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjangs = this.keranjangs;
        this.pesan.keranjangs.map((a) => {
          axios.patch(`http://localhost:3000/products/${a.products.id}`, { terjual: (a.products.terjual || 0) + a.jumlah_pemesanan })
        });
        axios
          .post("http://localhost:3000/pesanans", this.pesan)
          .then((res) => {
            // Hapus Semua Keranjang 
            this.$store.dispatch('setId', res.data.id);
            this.keranjangs.map(function (item) {
              return axios
                .delete("http://localhost:3000/keranjangs/" + item.id)
                .catch((error) => console.log(error));
            });
            this.$router.push({ path: "/pesanan-sukses" });
            this.$toast.success("Sukses Dipesan", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err))
      } else {
        this.$toast.error("Nama dan Nomor Meja Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    }


  },

  mounted() {
    axios
      .get("http://localhost:3000/keranjangs")
      .then((response) => this.setKeranjangs(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    totalharga() {
      return this.keranjangs.reduce(function (item, data) {
        return item + (data.products.harga * data.jumlah_pemesanan)
      }, 0)
    }
  }
}
</script>

<style></style>