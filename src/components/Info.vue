<template>
  <div>
    <div v-if="reservasiMahrom">
      <div class="card mb-10 border-danger card-dashed" v-if="informasi.data">
        <div class="card-header bg-danger">
          <h3 class="card-title fw-bold text-white">
            <strong class="text-white"> SAMBANG DITUTUP </strong>
          </h3>
        </div>
        <div class="card-body bg-light-danger">
          <h5 class="card-title">
            <strong>{{ informasi.data.nama_informasi }}</strong>
          </h5>
          <p class="card-text">
            {{ informasi.data.detail_informasi }}
          </p>
          <p>
            Tanggal Dimulai :
            <strong class="text-danger">{{
              informasi.data.tanggal_mulai
            }}</strong
            ><br />
            Tanggal Berakhir :
            <strong class="text-danger">{{
              informasi.data.tanggal_akhir
            }}</strong>
          </p>
          <p></p>
        </div>
        <div class="card-footer bg-light-danger border-danger">
          Dibuka pada tanggal <strong class="text-success">{{ buka() }}</strong>
        </div>
      </div>
    </div>
    <div v-if="moreSambang() >= pertemuan.batas_sambang">
      <div class="card mb-10 mt-3 border-danger card-dashed">
        <div class="card-header bg-danger">
          <h3 class="card-title fw-bold text-white">
            <strong class="text-white"> MELEBIHI BATAS </strong>
          </h3>
        </div>
        <div class="card-body bg-light-danger">
          <h5 class="card-title">
            <strong>Melebihi batas kegiatan sambang</strong>
          </h5>
          <p class="card-text">
            Wali santri tersebut telah melakukan kegiatan sambang santri
            sebanyak <strong>{{ sambang }} kali</strong> pada bulan ini.
          </p>
          <p></p>
        </div>
        <div class="card-footer bg-light-danger border-danger">
          Hanya boleh melakukan sambang dalam
          <strong>{{ pertemuan.batas_sambang }} kali</strong>
          per satu bulan
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "info",
  props: {
    value: [],
    data: [],
    date: [],
  },
  data() {
    return {
      info: "",
      informasi: {},
      reservasiMahrom: {},
      tgl_kunjungan: "",
      groupedData: [],
      sambang: 0,
      pertemuan: [],
    };
  },
  methods: {
    buka() {
      return moment(this.informasi.data.tanggal_akhir)
        .add(1, "days")
        .format("yyyy-MM-DD");
    },
    moreSambang() {
      if (this.reservasiMahrom.length != 0) {
        this.groupedData = this.tgl(this.reservasiMahrom.data, "tgl_kunjungan");
        return this.sambang;
      } else {
        return this.sambang;
      }
    },
    tgl(arr, prop) {
      var grouped = {};
      for (var i = 0; i < arr.length; i++) {
        var p = arr[i][prop];
        if (!grouped[p]) {
          grouped[p] = [];
        }

        for (let j = 0; j < Object.keys(grouped).length; j++) {
          const element = Object.keys(grouped)[j];
          const getDate = moment(element).format("MM");
          const kunjungan = moment(this.tgl_kunjungan).format("MM");
          if (getDate == kunjungan) {
            grouped[p].push(moment(element).format("MM"));
          }
        }
      }
      grouped[p].sort();

      var current = null;
      var cnt = 0;
      for (var o = 0; o < grouped[p].length; o++) {
        if (grouped[p][o] != current) {
          if (cnt > 0) {
            this.sambang = cnt;
            return grouped;
          }
          current = grouped[p][o];
          cnt = 1;
        } else {
          cnt++;
        }
      }
      if (cnt > 0) {
        this.sambang = cnt;
        return grouped;
      } else {
        this.sambang = 0;
      }
      return grouped;
    },
  },
  watch: {
    value: {
      handler: function (value) {
        this.info = value;
        axios
          .get("/informasi/" + this.info)
          .then((r) => {
            this.informasi = r.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    data: {
      handler: function (value) {
        this.reservasiMahrom = value;
      },
    },
    date: {
      handler: function (value) {
        this.tgl_kunjungan = value;
      },
    },
  },
  created() {
    this.info = this.value;
    this.reservasiMahrom = this.data;
    this.tgl_kunjungan = this.date;
  },
  mounted() {
    axios
      .get("/pertemuan")
      .then((r) => {
        this.pertemuan = r.data.data[0];
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/informasi/" + this.info)
      .then((r) => {
        this.informasi = r.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>