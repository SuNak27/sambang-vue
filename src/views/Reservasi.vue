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
              <span class="card-label fw-bolder fs-3 mb-1">Data Reservasi</span>
            </h3>
            <div class="card-toolbar">
              <div
                class="d-flex justify-content-end"
                data-kt-user-table-toolbar="base"
              >
                <a
                  href="/tambah_reservasi"
                  class="btn btn-sm btn-success w-150px"
                  >Tambah Reservasi</a
                >
              </div>
            </div>
          </div>
          <!--end::Header-->
          <!--begin::Body-->
          <div class="card-body py-3">
            <!--begin::Table container-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table
                id="reservasi"
                class="table table-row-bordered text-center gy-5"
              >
                <thead>
                  <tr class="fw-bolder fs-6">
                    <th class="w-50px text-center">No.</th>
                    <th class="min-w-100px px-0 text-center">No Reservasi</th>
                    <th class="w-100px text-start">Nama Wali</th>
                    <th class="min-w-100px text-center">Tgl Reservasi</th>
                    <th class="min-w-100px text-center">Tgl Kunjungan</th>
                    <th class="w-100px text-center">Status Kehadiran</th>
                    <th class="w-80px text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sambang, no) in reservasi.data" :key="sambang.id">
                    <td class="text-center">{{ ++no }}</td>
                    <td>21100000{{ sambang.id }}</td>
                    <td class="text-start">
                      {{ sambang.reservasi_walis[0].wali.nama_wali }}
                    </td>
                    <td>{{ sambang.tgl_reservasi }}</td>
                    <td>{{ sambang.tgl_kunjungan }}</td>
                    <td
                      class="text-center text-success"
                      v-if="sambang.hadir && sambang.jam_final <= currentTime"
                    >
                      Hadir
                    </td>
                    <td
                      class="text-center text-warning"
                      v-else-if="
                        sambang.hadir && sambang.jam_final >= currentTime
                      "
                    >
                      Berlangsung
                    </td>
                    <td v-else class="text-muted">Belum Hadir</td>
                    <td class="d-flex justify-content-center">
                      <router-link
                        :to="'/reservasi/' + sambang.id"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Detail"
                        class="
                          btn
                          btn-icon
                          btn-bg-warning
                          btn-active-text-primary
                          btn-sm
                          me-2
                        "
                        ><span
                          class="bi bi-journal-text"
                          aria-hidden="true"
                        ></span>
                      </router-link>
                      <a
                        v-if="sambang.hadir == false"
                        @click="hadir(sambang.id)"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Hadir"
                        class="
                          btn
                          btn-icon
                          btn-bg-success
                          btn-active-text-primary
                          btn-sm
                          me-2
                        "
                        ><span
                          class="bi bi-check2-circle text-white"
                          aria-hidden="true"
                        ></span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--end::Table-->
            </div>
            <!--end::Table container-->
          </div>
        </div>
        <!--endW::Tables Widget 1-->
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import moment from "moment";
import Swal from "sweetalert2";
export default {
  name: "Reservasi",
  data() {
    return {
      no: 1,
      reservasi: [],
      pertemuan: {},
      currentTime: null,
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format("X");
    },
    hadir(id) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan mengubah status hadir!",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-danger",
        },
        confirmButtonText: "Ya, Ubah!",
      }).then((result) => {
        if (result.value) {
          this.reservasi.hadir = true;
          this.reservasi.jam_mula = moment().format("X");
          this.reservasi.jam_final = moment()
            .add(this.pertemuan.data[0].waktu, "minutes")
            .format("X");

          axios
            .put("/reservasi/" + id, this.reservasi)
            .then(
              Swal.fire({
                title: "Berhasil",
                text: "Status Kehadiran telah diubah!",
                icon: "success",
                buttonsStyling: !1,
                confirmButtonText: "Ok!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                this.$router.go();
              })
            )
            .catch((error) => console.log(error));
        }
      });
    },
  },
  mounted() {
    axios
      .get("/reservasi")
      .then((r) => {
        this.reservasi = r.data;
        $(function () {
          $("#reservasi").DataTable({
            autoWidth: true,
            ordering: false,
          });
        });
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
      .get("/pertemuan")
      .then((response) => {
        this.pertemuan = response.data;
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
  },
  created() {
    this.currentTime = moment().format("X");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
};
</script>

<style>
</style>