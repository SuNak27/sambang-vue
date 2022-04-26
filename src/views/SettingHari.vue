<template>
  <div class="hari">
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-xl-12">
        <!--begin::Tables Widget 1-->
        <div class="card card-xl-stretch mb-xl-8">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3 mb-1">Data Hari</span>
            </h3>
            <div class="card-toolbar">
              <div
                class="d-flex justify-content-end"
                data-kt-user-table-toolbar="base"
              >
                <a
                  href="#"
                  class="btn btn-sm btn-success w-150px"
                  data-bs-toggle="modal"
                  data-bs-target="#tambah_hari"
                  >Tambah Data</a
                >

                <TambahHari />
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
                id="hari"
                class="table table-row-bordered text-center gy-5"
              >
                <thead>
                  <tr class="fw-bolder fs-6">
                    <th class="w-50px text-center">No.</th>
                    <th class="min-w-100px text-start">Nama Hari</th>
                    <th class="min-w-100px text-start">Nama Wilayah</th>
                    <th class="w-100px text-center">Shift</th>
                    <th class="w-100px text-center">Kapasitas</th>
                    <th class="w-100px text-center">Status</th>
                    <th class="w-100px text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(hari, no) in setHari.data" :key="hari.id">
                    <td class="text-center">{{ ++no }}</td>
                    <td class="text-start">{{ hari.nama_hari }}</td>
                    <td class="text-start">{{ hari.wilayah.nama_wilayah }}</td>
                    <td>{{ hari.shift.nama_shift }}</td>
                    <td>{{ hari.kapasitas }}</td>
                    <td
                      :class="
                        hari.status == 'Aktif' ? 'text-success' : 'text-danger'
                      "
                    >
                      {{ hari.status }}
                    </td>
                    <td class="d-flex justify-content-center">
                      <a
                        data-toggle="tooltip"
                        data-bs-toggle="modal"
                        :data-bs-target="'#edit_hari_' + hari.id"
                        data-placement="top"
                        title="Edit"
                        class="
                          btn
                          btn-icon
                          btn-bg-warning
                          btn-active-text-primary
                          btn-sm
                          me-2
                        "
                        ><span class="bi bi-pencil" aria-hidden="true"></span>
                      </a>

                      <EditHari :res="hari" />
                      <a
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Aktifkan"
                        class="
                          btn
                          btn-icon
                          btn-bg-success
                          btn-active-text-primary
                          btn-sm
                          me-1
                        "
                        v-if="hari.status == 'Nonaktif'"
                        @click="clickAktif(--no, hari.id)"
                      >
                        <span
                          class="bi bi-power text-white"
                          aria-hidden="true"
                        ></span>
                      </a>
                      <a
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Nonaktifkan"
                        class="
                          btn
                          btn-icon
                          btn-bg-danger
                          btn-active-text-primary
                          btn-sm
                          me-1
                        "
                        v-else
                        @click="clickNonaktif(--no, hari.id)"
                      >
                        <span
                          class="bi bi-power text-white"
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
import Swal from "sweetalert2";
import TambahHari from "@/components/TambahHari.vue";
import EditHari from "@/components/EditHari.vue";
export default {
  name: "SettingHari",
  data() {
    return {
      no: 1,
      setHari: [],
    };
  },
  components: {
    TambahHari,
    EditHari,
  },
  methods: {
    clickAktif(no, id) {
      this.setHari.data[no].status = "Aktif";
      axios
        .patch("/hari/" + id, this.setHari.data[no])
        .then()
        .catch((error) => console.log(error));
    },
    clickNonaktif(no, id) {
      this.setHari.data[no].status = "Nonaktif";
      axios
        .patch("/hari/" + id, this.setHari.data[no])
        .then()
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get("/hari")
      .then((r) => {
        this.setHari = r.data;
        $(document).ready(function () {
          $("#hari").DataTable({
            responsive: true,
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
  },
};
</script>

<style>
</style>