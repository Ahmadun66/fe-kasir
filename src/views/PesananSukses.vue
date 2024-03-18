<template>
    <div class="pesanan-sukses min-vh-100">
      <Navbar />
      <div class="vh-100">
        <div class="row h-100 d-flex align-items-center">
          <div class="text-center">
            <img src="done.png" alt="" width="250" />
            <h1><strong>Sukses!!!</strong></h1>
            <h4>Pesanan anda segera diproses <br />Silakan Menunggu</h4>
            <button @click="printNota" class="btn btn-success btn-md">
              Cetak Nota
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import axios from "axios";
  // import axios from "axios";
  
  export default {
    name: "pesanan-sukses",
    data() {
      return {
        datanya: [],
        currentDateTime: ""
      };
    },
    computed: {
      currentId() {
        return this.$store.state.id;
      },
      totalharga() {
        return this.datanya.keranjangs.reduce(function (item, data) {
          return item + data.products.harga * data.jumlah_pemesanan;
        }, 0);
      },
    },
    components: {
      Navbar,
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
  
      printNota() {
        // Fetch data from the server when the component is mounted
        axios
        //   .get("http://localhost:3000/pesanans/2810" )
          .get("http://localhost:3000/pesanans/" + this.currentId)
          .then((res) => {
            this.datanya = res.data;
            console.log(this.datanya);
  
            // Open a new window and set its content
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
            <html>
            <head>
              <title>Invoice Pembayaran</title>
              <style>
                #tabel {
                  font-size: 15px;
                  border-collapse: collapse;
                }
                #tabel td {
                  padding-left: 5px;
                  border: 1px solid black;
                }
              </style>
            </head>
            <body style='font-family:tahoma; font-size:8pt;'>
              
              <center>
                <table style='width:350px; font-size:16pt; font-family:calibri; border-collapse: collapse;' border='0'>
                  <tr>
                    <td width='70%' align='CENTER' vertical-align:top'>
                      <span style='color:black;'><b>Obat Lapar Restaurant</b></br>Jl. Kampung Baru Buka</span></br>
                      <span style='font-size:12pt'>No.99, ${this.currentDateTime}</span></br>
                    </td>
                  </tr>
                </table>
                <hr />
                <div>
                  <h2> Nama Pelanggan : ${this.datanya.nama}</h2>
                  <h2> Nomor Meja : ${this.datanya.noMeja}  </h2>         
                
                </div>
                           
                <hr width:50% />
                <style>
                  hr {
                    display: block;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                    margin-left: auto;
                    margin-right: auto;
                    border-style: inset;
                    border-width: 1px;
                  }
                </style>
                <table cellspacing='0' cellpadding='0' style='width:500px; font-size:12pt; font-family:calibri;  border-collapse: collapse;' border='0'>
                  <tr align='center'>
                    <td width='60%'>Nama Makanan</td>
                    <td width='30%'>Harga</td>
                    <td width='30%'>Jumlah</td>
                    <td width='50%'>Total</td>
                  </tr>
                  <tr>
                    <td colspan='5'><hr></td>
                  </tr>
                  ${this.datanya.keranjangs
                    ?.map(
                      (item) => `
                    <tr>
                      <td style='vertical-align:top; text-align:center; ' >${
                        item.products.nama
                      }</td>
                      <td style='vertical-align:top; text-align:center; '>${
                        item.products.harga
                      }</td>
                      <td style='vertical-align:top; text-align:center; '>${
                        item.jumlah_pemesanan
                      }</td>
                      <td style='vertical-align:top; text-align:center; '>${
                        item.jumlah_pemesanan * item.products.harga
                      }</td>
                   
                    </tr>
                  `
                    )
                    .join("")}
                    <tr>
                    <td colspan='5'><hr></td>
                  </tr>
                  <tr style='margin-top: 60px;'>
                  <td colspan='3' style='margin-top: 60px: display: flex'>
                  <div style='text-align:right; color:black'>Total : </div>
                  <td style='text-align:right; font-size:16pt; color:black;'> <b>${this.formatToRupiah(this.totalharga)}</b> </td>
                  </td>            
                  </tr>
                  <tr>
                  <td  colspan='3'>                
                  <div style='text-align:right; color:black'>Status :</div>
                  <td style='text-align:center; font-size:16pt; color:green;'>Lunas</td>
                  </td>            
                  </tr>
                  <!-- ... Other rows ... -->
                </table>
                <!-- ... Other content ... -->
                <div>
                  <img src="./a.png" style="width: 100%" />
                </div>
              
              </center>
            </body>
            </html>
          `);
  
            // Trigger print after window content has been written
            printWindow.document.close();
            printWindow.print();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
      // ...
    },
    // ...
    mounted() {
  
      const currentDate = new Date();
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false, // Use 24-hour format
        };
        this.currentDateTime = currentDate.toLocaleString('en-US', options);
    },
  };
  </script>
  
  <style>
  /* Your styles go here */
  </style>