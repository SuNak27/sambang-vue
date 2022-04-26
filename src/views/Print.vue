<template>
  <div class="print">
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-xl-12">
        <!--begin::Tables Widget 1-->
        <div class="card card-xl-stretch mb-xl-8">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3 mb-1">Print Data</span>
            </h3>
            <div class="card-toolbar">
              <!--begin::Menu-->
              <button
                type="button"
                class="
                  btn
                  btn-sm
                  btn-color-primary
                  btn-outline
                  btn-active-light-primary
                "
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
              >
                <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg-->
                <span class="svg-icon svg-icon-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect
                        x="5"
                        y="5"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                      />
                      <rect
                        x="14"
                        y="5"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      />
                      <rect
                        x="5"
                        y="14"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      />
                      <rect
                        x="14"
                        y="14"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      />
                    </g>
                  </svg>
                </span>
                Filter Option
                <!--end::Svg Icon-->
              </button>
              <button
                type="button"
                @click="print"
                class="
                  ms-3
                  btn
                  btn-sm
                  btn-color-success
                  btn-outline
                  btn-active-light-success
                "
              >
                Export PDF
              </button>
              <!--begin::Menu 1-->
              <div
                class="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
                data-kt-menu="true"
                id="kt_menu_6266177e1aedf"
              >
                <!--begin::Header-->
                <div class="px-7 py-5">
                  <div class="fs-5 text-dark fw-bolder">Filter Options</div>
                </div>
                <!--end::Header-->
                <!--begin::Menu separator-->
                <div class="separator border-gray-200"></div>
                <!--end::Menu separator-->
                <!--begin::Form-->
                <div class="px-7 py-5">
                  <!--begin::Input group-->
                  <div class="mb-10">
                    <!--begin::Label-->
                    <label class="form-label fw-bold">Tanggal Awal</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <div>
                      <input
                        type="date"
                        class="form-control"
                        v-model="tanggalAwal"
                      />
                    </div>
                    <!--end::Input-->
                  </div>
                  <div class="mb-10">
                    <!--begin::Label-->
                    <label class="form-label fw-bold">Tanggal Akhir</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <div>
                      <input
                        type="date"
                        class="form-control"
                        v-model="tanggalAkhir"
                      />
                    </div>
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->
                  <!--begin::Actions-->
                  <div class="d-flex justify-content-end">
                    <button
                      type="button"
                      @click="reset"
                      class="btn btn-sm btn-light btn-active-light-primary me-2"
                      data-kt-menu-dismiss="true"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      @click="filter"
                      class="btn btn-sm btn-primary"
                      data-kt-menu-dismiss="true"
                    >
                      Apply
                    </button>
                  </div>
                  <!--end::Actions-->
                </div>
                <!--end::Form-->
              </div>
              <!--end::Menu 1-->
              <!--end::Menu-->
            </div>
          </div>
          <!--end::Header-->
          <!--begin::Body-->
          <div class="card-body py-3">
            <!--begin::Table container-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table
                id="tabel_print"
                class="table text-center table-row-bordered gy-5"
              >
                <thead>
                  <tr class="fw-bolder fs-6">
                    <th class="w-100px text-center">No Reservasi</th>
                    <th class="w-100px text-start">Nama Wali</th>
                    <th class="w-100px text-center">Tgl Kunjungan</th>
                    <th class="w-100px text-center">Status</th>
                    <th class="w-100px text-center">Jam Mulai</th>
                    <th class="w-80px text-center">Jam Akhir</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sambang in reservasi.data" :key="sambang.id">
                    <td>2110000002{{ sambang.id }}</td>
                    <td class="text-start">
                      {{ sambang.reservasi_walis[0].wali.nama_wali }}
                    </td>
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
                    <td v-if="sambang.jam_mula != ''">
                      {{ formatTime(sambang.jam_mula) }}
                    </td>
                    <td v-else>-</td>
                    <td v-if="sambang.jam_mula != ''">
                      {{ formatTime(sambang.jam_final) }}
                    </td>
                    <td v-else>-</td>
                  </tr>
                  <tr class="text-center" v-if="!reservasi.data">
                    <td colspan="7">
                      <span class="text-danger">Data tidak ditemukan</span>
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
import Swal from "sweetalert2";
import $ from "jquery";
import moment from "moment";
import jspdf from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  data() {
    return {
      no: 1,
      reservasi: [],
      currentTime: null,
      tanggalAwal: "",
      tanggalAkhir: "",
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format("X");
    },
    formatTime(jam) {
      return moment.unix(jam).format("HH:mm");
    },
    reset() {
      this.tanggalAwal = "";
      this.tanggalAkhir = "";
    },
    filter() {
      if (this.reservasi.data) {
        if (this.reservasi.data.length == 0) {
          this.reservasi = [];
        }
      }
      axios
        .get("/reservasi")
        .then((r) => {
          this.reservasi = r.data;
          $(document).ready(function () {
            $("#tabel_print").DataTable({
              retrieve: true,
              ordering: false,
            });
          });
          const data = [];
          for (let i = 0; i < this.reservasi.data.length; i++) {
            const element = this.reservasi.data[i];
            const j = moment(element.tgl_kunjungan).format("X");
            if (
              j >= moment(this.tanggalAwal).format("X") &&
              j <= moment(this.tanggalAkhir).format("X")
            ) {
              data.push(element);
            }
          }
          this.reservasi.data = data;
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
              if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }
            });
          }
        });
    },
    print() {
      if (this.reservasi.data) {
        if (this.reservasi.data.length > 0) {
          const doc = new jspdf();
          autoTable(doc, { html: "#tabel_print" });

          doc.save("table.pdf");
        } else {
          Swal.fire({
            title: "Error",
            text: "Data tidak ditemukan",
            icon: "error",
            buttonsStyling: !1,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary order-2",
            },
          });
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "Data tidak ditemukan",
          icon: "error",
          buttonsStyling: !1,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary order-2",
          },
        });
      }
    },
  },
  mounted() {
    axios
      .get("/pertemuan/1")
      .then((r) => {
        this.pertemuan = r.data.data;
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