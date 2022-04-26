<template>
  <div class="history">
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
                >History Kunjungan</span
              >
            </h3>
          </div>

          <!--begin::Body-->
          <div class="card-body py-3">
            <!--begin::Table container-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table
                id="history"
                class="table table-row-bordered text-center gy-5"
              >
                <thead>
                  <tr class="fw-bolder fs-6">
                    <th class="w-50px text-center">No.</th>
                    <th class="min-w-100px text-center">No Reservasi</th>
                    <th class="min-w-100px text-start">Nama Santri</th>
                    <th class="min-w-100px text-start">Wilayah</th>
                    <th class="min-w-100px w-150-px text-center">
                      Tgl Kunjungan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sambang, no) in reservasi.data" :key="sambang.id">
                    <td>{{ ++no }}</td>
                    <td>21100000{{ sambang.id }}</td>
                    <td class="text-start">
                      {{ sambang.reservasi_santris[0].santri.nama }}
                    </td>
                    <td class="text-start">
                      {{
                        sambang.reservasi_santris[0].santri.wilayah.nama_wilayah
                      }}
                    </td>
                    <td>{{ sambang.tgl_kunjungan }}</td>
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

export default {
  name: "History",
  data() {
    return {
      no: 1,
      reservasi: [],
    };
  },
  mounted() {
    axios
      .get("/reservasi")
      .then((r) => {
        this.reservasi = r.data;
        $(function () {
          $("#history").DataTable({
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