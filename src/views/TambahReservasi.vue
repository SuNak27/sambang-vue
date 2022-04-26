<template>
  <div class="reservasi">
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-xl-12">
        <!--begin::Tables Widget 1-->
        <div class="card card-xl-stretch mb-xl-8">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3 mb-1"
                >Form Tambah Reservasi</span
              >
            </h3>
          </div>
          <!--end::Header-->
          <!--begin::Body-->
          <form action="" v-on:submit.prevent>
            <div class="card-body py-3">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-10">
                    <label for="" class="required form-label">No Mahrom</label>
                    <input
                      v-model="nik"
                      name="search"
                      id="search"
                      @keyup="search"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-10">
                    <label for="" class="form-label">Nama Mahrom</label>
                    <input
                      type="text"
                      v-if="nik == '' || dataWali.no_mahrom != nik"
                      readonly
                      class="form-control form-control-solid"
                    />
                    <input
                      type="text"
                      name="nama"
                      id="nama"
                      readonly
                      class="form-control form-control-solid"
                      v-model="dataWali.nama_wali"
                      v-else
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="mb-10">
                    <label for="" class="required form-label">Shift</label>
                    <select
                      @change="filterHari"
                      v-model="reservasi.id_shift"
                      class="selectpicker form-control form-control-md"
                      data-live-search="true"
                      required
                    >
                      <option disabled selected>-- Pilih Shift --</option>
                      <option
                        v-for="shif in shift.data"
                        :key="shif.id"
                        :value="shif.id"
                      >
                        {{ shif.nama_shift }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-10">
                    <label for="" class="form-label">Jam Awal</label>
                    <input
                      v-if="checkShift.data == null"
                      type="text"
                      readonly
                      class="form-control form-control-solid"
                    />
                    <input
                      v-else
                      type="text"
                      readonly
                      :value="checkShift.data.jam_awal"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-10">
                    <label for="" class="form-label">Jam Akhir</label>
                    <input
                      type="text"
                      v-if="checkShift.data == null"
                      readonly
                      class="form-control form-control-solid"
                    />
                    <input
                      type="text"
                      v-else
                      readonly
                      :value="checkShift.data.jam_akhir"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-10">
                    <label for="" class="required form-label"
                      >Hari Kunjungan</label
                    >
                    <select
                      v-if="reservasi.id_shift == null"
                      class="form-control form-control-md"
                    >
                      <option selected value="">
                        -- Pilih Shift Terlebih Dahulu --
                      </option>
                    </select>
                    <select
                      @change="checkStatus"
                      v-model="reservasi.id_hari"
                      v-else
                      class="form-control"
                    >
                      <option>-- Pilih Hari --</option>
                      <option
                        v-for="day in hari.data"
                        :key="day.id"
                        :value="day.id"
                      >
                        {{ day.nama_hari }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-10">
                    <label for="" class="required form-label"
                      >Tanggal Kunjungan</label
                    >
                    <b-form-datepicker
                      v-if="reservasi.id_hari && nik != ''"
                      v-model="reservasi.tgl_kunjungan"
                      :min="min"
                      reset-button
                      close-button
                      :date-disabled-fn="dateDisabled"
                      @input="moreSambang()"
                    ></b-form-datepicker>
                    <b-form-datepicker
                      v-else
                      reset-button
                      close-button
                      aria-disabled="true"
                      class="form-control-solid"
                    ></b-form-datepicker>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <Info
                    :value="info()"
                    :data="this.mahrom"
                    :date="reservasi.tgl_kunjungan"
                  />
                </div>
              </div>
              <div class="row mb-10">
                <div class="col-12">
                  <label for="" class="required form-label">Data Santri</label>
                  <div class="table-responsive">
                    <!--begin::Table-->
                    <table
                      class="
                        table table-row-dashed table-row-gray-300
                        align-middle
                        gs-0
                        gy-4
                      "
                    >
                      <!--begin::Table head-->
                      <thead>
                        <tr class="fw-bolder text-muted">
                          <th class="w-25px"></th>
                          <th class="min-w-50px">No Mahrom</th>
                          <th class="min-w-120px">Nama Santri</th>
                          <th class="min-w-120px">Wilayah</th>
                        </tr>
                      </thead>
                      <!--end::Table head-->
                      <!--begin::Table body-->
                      <tbody>
                        <tr v-if="nik == '' || mahromSantri != nik">
                          <td colspan="5" class="text-center">
                            <div class="text-danger">
                              Silahkan Masukkan No Mahrom
                            </div>
                          </td>
                        </tr>
                        <tr
                          v-for="santriNj in santri.data"
                          :key="santriNj.id"
                          v-else
                        >
                          <td>
                            <div
                              class="
                                form-check
                                form-check-sm
                                form-check-custom
                                form-check-solid
                              "
                            >
                              <span
                                v-if="
                                  disabledSantri != '' &&
                                  disabledSantri != 'Sama'
                                "
                                ><i class="fas fa-times me-3 text-danger"></i
                              ></span>
                              <input
                                v-if="reservasi.tgl_kunjungan"
                                @change="pilihSantri"
                                class="form-check-input santri-check"
                                type="checkbox"
                                id="checkSantri"
                                v-model="checkedSantri"
                                :value="santriNj"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div
                                class="d-flex justify-content-start flex-column"
                              >
                                <div
                                  style="cursor: pointer"
                                  class="
                                    text-dark
                                    fw-bolder
                                    text-hover-primary
                                    fs-6
                                  "
                                >
                                  {{ santriNj.no_mahrom }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div
                              style="cursor: pointer"
                              class="
                                text-dark
                                fw-bolder
                                text-hover-primary
                                d-block
                                fs-6
                              "
                            >
                              {{ santriNj.nama }}
                            </div>
                          </td>
                          <td>
                            <div
                              style="cursor: pointer"
                              class="
                                text-dark
                                fw-bolder
                                text-hover-primary
                                d-block
                                fs-6
                              "
                            >
                              {{ santriNj.wilayah.nama_wilayah }}
                            </div>
                          </td>
                        </tr>
                        <tr v-if="disabledSantri == 'Tidak Sama'">
                          <td colspan="5" class="text-center">
                            <div class="btn btn-danger btn-block">
                              Hari {{ check.data.nama_hari }}
                              {{ check.data.shift.nama_shift }} Khusus
                              {{
                                check.data.status_hari == "Santri"
                                  ? "Santri Putra"
                                  : "Santri Putri"
                              }}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                </div>
              </div>
              <div class="row mb-10">
                <div class="col-12">
                  <label for="" class="required form-label"
                    >Data Wali Santri</label
                  >
                  <div class="table-responsive">
                    <!--begin::Table-->
                    <table
                      class="
                        table table-row-dashed table-row-gray-300
                        align-middle
                        gs-0
                        gy-4
                      "
                    >
                      <!--begin::Table head-->
                      <thead>
                        <tr class="fw-bolder text-muted">
                          <th class="w-25px"></th>
                          <th class="min-w-50px">No Mahrom</th>
                          <th class="min-w-120px">Nama Wali Santri</th>
                          <th class="min-w-120px">Status Mahrom</th>
                        </tr>
                      </thead>
                      <!--end::Table head-->
                      <!--begin::Table body-->
                      <tbody>
                        <tr v-if="nik == '' || dataWali.no_mahrom != nik">
                          <td colspan="5" class="text-center">
                            <div class="text-danger">
                              Silahkan Masukkan No Mahrom
                            </div>
                          </td>
                        </tr>
                        <tr
                          v-for="waliSantri in wali.data"
                          :key="waliSantri.id"
                          v-else
                        >
                          <td>
                            <div
                              class="
                                form-check
                                form-check-sm
                                form-check-custom
                                form-check-solid
                              "
                            >
                              <span v-if="moreWali != '' && moreWali == 'Lebih'"
                                ><i class="fas fa-times me-2 text-danger"></i
                              ></span>
                              <input
                                v-if="reservasi.tgl_kunjungan"
                                class="form-check-input"
                                type="checkbox"
                                :value="waliSantri.id"
                                v-model="checkedWali"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div
                                class="d-flex justify-content-start flex-column"
                              >
                                <div
                                  style="cursor: pointer"
                                  class="
                                    text-dark
                                    fw-bolder
                                    text-hover-primary
                                    fs-6
                                  "
                                >
                                  {{ waliSantri.no_mahrom }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div
                              style="cursor: pointer"
                              class="
                                text-dark
                                fw-bolder
                                text-hover-primary
                                d-block
                                fs-6
                              "
                            >
                              {{ waliSantri.nama_wali }}
                            </div>
                          </td>
                          <td>
                            <div
                              style="cursor: pointer"
                              class="
                                text-dark
                                fw-bolder
                                text-hover-primary
                                d-block
                                fs-6
                              "
                            >
                              {{ waliSantri.status }}
                            </div>
                          </td>
                        </tr>
                        <tr v-if="moreWali == 'Lebih'">
                          <td colspan="5" class="text-center">
                            <div class="btn btn-danger btn-block">
                              Maksimal Hanya Boleh Memilih
                              {{ pertemuan.batas_tamu }} Wali Santri
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-12 text-center">
                  <button
                    type="submit"
                    id="tambah_reservasi"
                    class="btn me-3 btn-primary"
                    @click="simpan"
                  >
                    <span class="indicator-label">Submit</span>
                    <span class="indicator-progress"
                      >Please wait...
                      <span
                        class="
                          spinner-border spinner-border-sm
                          align-middle
                          ms-2
                        "
                      ></span
                    ></span>
                  </button>
                  <a href="/reservasi" class="btn btn-danger">Batal</a>
                </div>
              </div>
            </div>
          </form>
        </div>
        <!--endW::Tables Widget 1-->
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->
  </div>
</template>

<script>
import Info from "@/components/Info.vue";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "TambahReservasi",
  components: {
    Info,
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);
    return {
      min: minDate,
      nik: "",
      dataWali: {},
      reservasi: {
        tgl_reservasi: moment().format("yyyy-MM-DD"),
      },
      reservasiId: {},
      reservasi_wali: {},
      reservasi_santri: {},
      shift: {
        data: [],
      },
      hari: {
        data: [],
      },
      checkShift: {},
      check: {},
      informasi: [],
      status: "",
      checkedSantri: [],
      status_santri: "",
      santri: [],
      mahromSantri: "",
      checkedWali: [],
      wali: [],
      liburSambang: false,
      pertemuan: {},
      mahrom: [],
      sambang: 0,
      groupedData: [],
      tgl_kunjungan: "",
    };
  },
  methods: {
    search() {
      if (this.checkedSantri || this.checkedWali) {
        this.checkedSantri = [];
        this.checkedWali = [];
      }
      axios
        .get("/wali/" + this.nik)
        .then((response) => {
          this.dataWali = response.data.data[0];
          this.wali = response.data;
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.dataWali = "";
          }
        });
      axios
        .get("/santri/" + this.nik)
        .then((response) => {
          this.mahromSantri = response.data.data[0].no_mahrom;
          this.santri = response.data;
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.santri = "";
          }
        });

      axios
        .get("/reservasi/mahrom/" + this.nik)
        .then((response) => (this.mahrom = response.data))
        .catch((error) => {
          if (error.response.status == 400) {
            this.mahrom = [];
          }
        });
    },
    filterHari(event) {
      axios
        .get("/hari/shift/" + event.target.value)
        .then((response) => {
          const data = [];
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            if (element.status == "Aktif") {
              data.push(element);
            }
          }
          this.hari.data = data;
        })
        .catch();
      axios
        .get("/shift/" + event.target.value)
        .then((response) => {
          this.checkShift = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkStatus(event) {
      axios
        .get("/hari/" + event.target.value)
        .then((response) => {
          this.check = response.data;
          this.status = response.data.data.status_hari;
          if (this.reservasi.tgl_kunjungan) {
            this.reservasi.tgl_kunjungan = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    info() {
      if (this.informasi.data != null && this.reservasi.tgl_kunjungan != "") {
        const date = moment(this.reservasi.tgl_kunjungan).format("yyyy-MM-DD");
        for (let i = 0; i < this.informasi.data.length; i++) {
          const element = this.informasi.data[i];
          const from = moment(element.tanggal_mulai).format("yyyy-MM-DD");
          const to = moment(element.tanggal_akhir).format("yyyy-MM-DD");

          if (date >= from && date <= to) {
            this.liburSambang = true;
            return element.id;
          } else {
            this.liburSambang = false;
          }
        }
        return this.reservasi.tgl_kunjungan;
      }
    },
    pilihSantri() {
      if (this.checkedSantri.length >= 1) {
        this.status_santri = this.checkedSantri[0].status;
      } else {
        this.status_santri = "";
      }
    },
    dateDisabled(ymd, date) {
      const weekday = date.getDay();
      if (this.check != "") {
        if (this.check.data.nama_hari == "Minggu") {
          return weekday != 0;
        } else if (this.check.data.nama_hari == "Senin") {
          return weekday != 1;
        } else if (this.check.data.nama_hari == "Selasa") {
          return weekday != 2;
        } else if (this.check.data.nama_hari == "Rabu") {
          return weekday != 3;
        } else if (this.check.data.nama_hari == "Kamis") {
          return weekday != 4;
        } else if (this.check.data.nama_hari == "Sabtu") {
          return weekday != 6;
        } else if (this.check.data.nama_hari == "Jum'at") {
          return weekday != 5;
        }
      } else {
        return weekday;
      }
    },
    simpan() {
      var e = document.querySelector("#tambah_reservasi");
      e.setAttribute("data-kt-indicator", "on");
      this.reservasi.no_mahrom = this.nik;
      this.reservasi.jam_mula = "";
      this.reservasi.jam_final = "";
      this.reservasi.hadir = "";
      if (
        this.reservasi.id_hari != null &&
        this.reservasi.id_shift != null &&
        this.liburSambang == false &&
        this.sambang < this.pertemuan.batas_sambang &&
        this.reservasi.tgl_kunjungan != null
      ) {
        if (
          this.disabledSantri == "Sama" &&
          this.status_santri != "" &&
          this.moreWali != "Lebih" &&
          this.moreWali.length != 0
        ) {
          setTimeout(function () {
            e.removeAttribute("data-kt-indicator");
          }, 2e3);
          axios
            .post("/reservasi", this.reservasi)
            .then()
            .catch((err) => console.log("Gagal", err));

          for (let index = 0; index < this.checkedWali.length; index++) {
            var element = this.checkedWali[index];
            this.reservasi_wali.id_wali = element;
            if (this.reservasiId.result == null) {
              this.reservasiId.result = { id: 0 };
              this.reservasi_wali.id_reservasi = this.reservasiId.result.id + 1;
              this.reservasi_santri.id_reservasi =
                this.reservasiId.result.id + 1;
            } else {
              this.reservasi_wali.id_reservasi = this.reservasiId.result.id + 1;
              this.reservasi_santri.id_reservasi =
                this.reservasiId.result.id + 1;
            }
            axios
              .post("/reservasi_wali", this.reservasi_wali)
              .then()
              .catch((err) => console.log("Gagal", err));
          }

          for (let index = 0; index < this.checkedSantri.length; index++) {
            var s = this.checkedSantri[index].id;
            this.reservasi_santri.id_santri = s;
            axios
              .post("/reservasi_santri", this.reservasi_santri)
              .then()
              .catch((err) => console.log("Gagal", err));
          }
          Swal.fire({
            title: "Berhasil",
            text: "Data telah ditambah",
            icon: "success",
            buttonsStyling: !1,
            confirmButtonText: "Ok!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            this.$router.push({ path: "reservasi" });
          });
        } else {
          setTimeout(function () {
            e.removeAttribute("data-kt-indicator"),
              Swal.fire({
                title: "Gagal",
                text: "Pastikan telah mengisi data yang sesuai!",
                icon: "error",
                buttonsStyling: !1,
                confirmButtonText: "Coba lagi!",
                customClass: { confirmButton: "btn btn-primary" },
              });
          }, 2e3);
        }
      } else {
        setTimeout(function () {
          e.removeAttribute("data-kt-indicator"),
            Swal.fire({
              title: "Gagal",
              text: "Terdapat data yang salah atau kosong!",
              icon: "error",
              buttonsStyling: !1,
              confirmButtonText: "Coba lagi!",
              customClass: { confirmButton: "btn btn-primary" },
            });
        }, 2e3);
      }
    },
    moreSambang() {
      if (this.mahrom.length != 0) {
        this.groupedData = this.tgl(this.mahrom.data, "tgl_kunjungan");
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
          const kunjungan = moment(this.reservasi.tgl_kunjungan).format("MM");
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
  mounted() {
    axios
      .get("/shift")
      .then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          const element = response.data.data[i];
          if (element.status == "Aktif") {
            this.shift.data.push(element);
          }
        }
      })
      .catch();

    axios
      .get("/informasi")
      .then((response) => {
        this.informasi = response.data;
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          Swal.fire({
            text: "Sesi telah berakhir, silahkan login kembali",
            icon: "error",
            buttonsStyling: !1,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary order-2",
            },
          }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }
          });
        }
      });

    axios
      .get("/reservasiId")
      .then((response) => (this.reservasiId = response.data))
      .catch(function (error) {
        if (error.response.status === 401) {
          Swal.fire({
            text: "Sesi telah berakhir, silahkan login kembali",
            icon: "error",
            buttonsStyling: !1,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary order-2",
            },
          }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }
          });
        }
      });
    axios
      .get("/pertemuan")
      .then((response) => (this.pertemuan = response.data.data[0]))
      .catch(function (error) {
        if (error.response.status === 401) {
          Swal.fire({
            text: "Sesi telah berakhir, silahkan login kembali",
            icon: "error",
            buttonsStyling: !1,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary order-2",
            },
          }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }
          });
        }
      });
  },
  computed: {
    disabledSantri() {
      if (this.status != this.status_santri && this.status_santri != "") {
        return "Tidak Sama";
      } else {
        return "Sama";
      }
    },
    moreWali() {
      let statusWali = this.checkedWali;
      const batas = this.pertemuan.batas_tamu;
      if (statusWali.length > batas) {
        statusWali = "Lebih";
        return statusWali;
      }
      return statusWali;
    },
  },
};
</script>

<style>
</style>