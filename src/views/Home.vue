<template>
  <div class="home">
    <!--begin::Row-->
    <Crud v-bind="{ url: '/reservasi' }" @data="getReservasi" />
    <Crud v-bind="{ url: '/pertemuan/1' }" @data="getPertemuan" />
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
          </div>
          <!--end::Header-->
          <!--begin::Body-->
          <div class="card-body py-3">
            <p class="text-muted mb-3" v-if="user.role == 'sysadmin'">
              Ketentuan Kunjungan Wali Santri
            </p>
            <div
              v-if="user.role == 'sysadmin'"
              class="
                bg-light-primary
                rounded
                border-primary border border-dashed
                mb-3
                p-3
              "
            >
              <div class="table-responsive">
                <table
                  class="
                    table
                    gy-2
                    mb-0
                    table-row-dashed table-row-gray-200
                    align-middle
                  "
                >
                  <!--begin::Table head-->
                  <thead>
                    <tr class="border-0">
                      <th class="p-0 min-w-130px"></th>
                      <th class="p-0 min-w-140px"></th>
                      <th class="p-0 min-w-100px"></th>
                      <th class="p-0 min-w-50px"></th>
                    </tr>
                  </thead>
                  <!--end::Table head-->
                  <!--begin::Table body-->
                  <tbody class="text-center">
                    <tr>
                      <td>
                        <p
                          class="
                            text-dark
                            fw-bolder
                            text-hover-primary
                            mb-1
                            fs-6
                            d-inline
                          "
                        >
                          {{ pertemuan.batas_sambang }}
                        </p>
                        <span class="text-muted fw-bold"> Kunjungan/Bulan</span>
                      </td>
                      <td class="text-muted fw-bold">
                        <p
                          class="
                            text-dark
                            fw-bolder
                            text-hover-primary
                            mb-1
                            fs-6
                            d-inline
                          "
                        >
                          {{ pertemuan.batas_tamu }}
                        </p>
                        <span class="text-muted fw-bold"> Tamu/Kunjungan</span>
                      </td>
                      <td class="">
                        <p
                          class="
                            text-dark
                            fw-bolder
                            text-hover-primary
                            mb-1
                            fs-6
                            d-inline
                          "
                        >
                          {{ pertemuan.waktu }}
                        </p>
                        <span class="text-muted fw-bold"> Menit/Kunjungan</span>
                      </td>
                      <td class="">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          :data-bs-target="'#edit_pertemuan_' + pertemuan.id"
                          @mouseover="edit = pertemuan.id"
                          title="Edit Pertemuan"
                          class="
                            btn
                            btn-sm
                            btn-icon
                            btn-bg-light
                            btn-active-color-primary
                          "
                        >
                          <span class="svg-icon svg-icon-muted svg-icon-2"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                opacity="0.3"
                                d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                fill="currentColor"
                              />
                              <path
                                d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                fill="currentColor"
                              /></svg
                          ></span>
                        </a>
                        <EditPertemuan
                          v-if="edit == pertemuan.id"
                          :res="pertemuan"
                        />
                      </td>
                    </tr>
                  </tbody>
                  <!--end::Table body-->
                </table>
              </div>
            </div>
            <!--begin::Table container-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table
                id="reservasi"
                class="table text-center table-row-bordered gy-5"
              >
                <thead>
                  <tr class="fw-bolder fs-6">
                    <th>No</th>
                    <th>Nomor Pengurus</th>
                    <th class="text-start">Nama Wali</th>
                    <th>Tgl Kunjungan</th>
                    <th>Status</th>
                    <th>Jam Mulai</th>
                    <th>Jam Akhir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sambang, no) in reservasi.data" :key="sambang.id">
                    <td>{{ ++no }}</td>
                    <td>Nomor Pengurus</td>
                    <td class="text-start">
                      {{ sambang.reservasi_walis[0].wali.nama_wali }}
                    </td>
                    <td>{{ sambang.tgl_kunjungan }}</td>
                    <td v-if="sambang.jam_mula != ''">
                      {{ formatTime(sambang.jam_mula) }}
                    </td>
                    <td v-else>-</td>
                    <td v-if="sambang.jam_mula != ''">
                      {{ formatTime(sambang.jam_final) }}
                    </td>
                    <td v-else>-</td>
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
                        @click="hadir(sambang.id, --no)"
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
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-xl-12">
        <!--begin::Tables Widget 1-->
        <div class="card card-xl-stretch mb-xl-8">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3 mb-1">Chart</span>
            </h3>
          </div>
          <!--end::Header-->
          <!--begin::Body-->
          <div class="card-body py-3">
            <Chart :value="reservasi.data" />
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
import Chart from "@/components/Chart.vue";
import Crud from "@/components/Crud.vue";
import EditPertemuan from "@/components/Edit/EditPertemuan.vue";
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";
import moment from "moment";
const token = localStorage.getItem("token");
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export default {
  name: "Home",
  components: {
    Chart,
    Crud,
    EditPertemuan,
  },
  data() {
    return {
      no: 1,
      edit: 0,
      reservasi: [],
      pertemuan: {},
      currentTime: null,
      user: parseJwt(token),
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format("X");
    },
    formatTime(jam) {
      return moment.unix(jam).format("HH:mm");
    },
    getReservasi(value) {
      this.reservasi = value;
      $(document).ready(function () {
        $("#reservasi").DataTable({
          responsive: true,
          ordering: false,
        });
      });
    },
    getPertemuan(value) {
      this.pertemuan = value.data;
    },
    hadir(id, no) {
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
          this.reservasi.data[no].hadir = true;
          this.reservasi.data[no].jam_mula = moment().format("X");
          this.reservasi.data[no].jam_final = moment()
            .add(this.pertemuan.waktu, "minutes")
            .format("X");

          axios
            .put("/reservasi/" + id, this.reservasi.data[no])
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
  created() {
    this.currentTime = moment().format("X");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
};
</script>
