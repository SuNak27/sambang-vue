<template>
  <div class="informasi">
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
                >Pusat Informasi</span
              >
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
                  data-bs-target="#tambah_informasi"
                  >Tambah Data</a
                >

                <TambahInformasi />
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
                id="informasi"
                class="table text-center table-row-bordered gy-5"
              >
                <thead>
                  <tr class="fw-bolder fs-6">
                    <th class="w-50px text-center">No.</th>
                    <th class="min-w-100px text-start">Nama Informasi</th>
                    <th class="min-w-200px w-300px text-start">
                      Detail Informasi
                    </th>
                    <th class="min-w-100px text-center">Tanggal Mulai</th>
                    <th class="min-w-100px text-center">Tanggal Akhir</th>
                    <th class="min-w-100px text-center">Status</th>
                    <th class="min-w-100px text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, no) in informasi.data" :key="info.id">
                    <td>{{ ++no }}</td>
                    <td class="text-start">{{ info.nama_informasi }}</td>
                    <td class="text-start">{{ info.detail_informasi }}</td>
                    <td>{{ info.tanggal_mulai }}</td>
                    <td>{{ info.tanggal_akhir }}</td>
                    <td
                      :class="
                        info.status == 'Buka' ? 'text-success' : 'text-danger'
                      "
                    >
                      {{ info.status }}
                    </td>
                    <td class="d-flex justify-content-center">
                      <a
                        data-toggle="tooltip"
                        data-bs-toggle="modal"
                        :data-bs-target="'#edit_informasi_' + info.id"
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
                      >
                        <span class="bi bi-pencil" aria-hidden="true"></span
                      ></a>
                      <EditInformasi :res="info" />
                      <a
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Buka"
                        class="
                          btn
                          btn-icon
                          btn-bg-success
                          btn-active-text-primary
                          btn-sm
                          me-1
                        "
                        v-if="info.status == 'Nonaktif'"
                        @click="clickAktif(--no, info.id)"
                      >
                        <span
                          class="bi bi-power text-white"
                          aria-hidden="true"
                        ></span>
                      </a>
                      <a
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Tutup"
                        class="
                          btn
                          btn-icon
                          btn-bg-danger
                          btn-active-text-primary
                          btn-sm
                          me-1
                        "
                        v-else
                        @click="clickNonaktif(--no, info.id)"
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
import TambahInformasi from "@/components/TambahInformasi.vue";
import EditInformasi from "@/components/EditInformasi.vue";
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";
export default {
  name: "Informasi",
  components: { TambahInformasi, EditInformasi },
  data() {
    return {
      no: 1,
      informasi: [],
    };
  },
  methods: {
    clickAktif(no, id) {
      this.informasi.data[no].status = "Buka";
      axios
        .patch("/informasi/" + id, this.informasi.data[no])
        .then()
        .catch((error) => console.log(error));
    },
    clickNonaktif(no, id) {
      this.informasi.data[no].status = "Tutup";
      axios
        .patch("/informasi/" + id, this.informasi.data[no])
        .then()
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get("/informasi")
      .then((r) => {
        this.informasi = r.data;
        $(document).ready(function () {
          $("#informasi").DataTable({
            responsive: false,
            autoWidth: false,
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

<style></style>
