<template>
  <div class="detail_resrvasi">
    <!--begin::Row-->
    <div class="row">
      <!--begin::Col-->
      <div class="col-md-6 mb-5">
        <!--begin::Tables Widget 1-->
        <div class="card card-xl-stretch mb-xl-8">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3 mb-1">Data Santri</span>
            </h3>
          </div>
          <!--end::Header-->
          <!--begin::Body-->
          <div class="card-body py-3">
            <!--begin::Table container-->
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
                  <tr class="border-0">
                    <th class="p-0 min-w-25px"></th>
                    <th class="p-0 min-w-150px"></th>
                    <th class="p-0 min-w-120px"></th>
                    <th class="p-0 min-w-120px"></th>
                  </tr>
                </thead>
                <!--end::Table head-->
                <!--begin::Table body-->
                <tbody>
                  <tr
                    v-for="(sambang, no) in reservasi_santri"
                    :key="sambang.id"
                  >
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-flex justify-content-center flex-column">
                          <div
                            style="cursor: pointer"
                            class="text-dark fw-bolder text-hover-primary fs-6"
                          >
                            {{ ++no }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        style="cursor: pointer"
                        class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >
                        {{ sambang.santri.nama }}
                      </div>
                      <span class="text-muted fw-bold d-block">{{
                        sambang.santri.no_mahrom
                      }}</span>
                    </td>
                    <td class="text-center fw-bold">
                      {{ sambang.santri.wilayah.nama_wilayah }}
                    </td>
                    <td class="text-end">
                      <a
                        data-bs-toggle="modal"
                        :data-bs-target="'#konfirmasi_' + sambang.id_santri"
                        class="
                          btn
                          btn-sm
                          btn-icon
                          btn-bg-light
                          btn-active-color-primary
                        "
                      >
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                        <span class="svg-icon svg-icon-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              opacity="0.5"
                              x="18"
                              y="13"
                              width="13"
                              height="2"
                              rx="1"
                              transform="rotate(-180 18 13)"
                              fill="currentColor"
                            />
                            <path
                              d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <!--end::Svg Icon-->
                      </a>
                      <Konfirmasi :value="sambang.id_santri" />
                    </td>
                  </tr>
                </tbody>
                <!--end::Table body-->
              </table>
              <!--end::Table-->
            </div>
            <!--end::Table container-->
          </div>
        </div>
        <!--endW::Tables Widget 1-->
      </div>
      <!--end::Col-->
      <!--begin::Col-->
      <div class="col-md-6 mb-5">
        <!--begin::Tables Widget 1-->
        <div class="card card-xl-stretch mb-xl-8">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3 mb-1"
                >Data Wali Santri</span
              >
            </h3>
          </div>
          <!--end::Header-->
          <!--begin::Body-->
          <div class="card-body py-3">
            <!--begin::Table container-->
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
                  <tr class="border-0">
                    <th class="p-0 min-w-25px"></th>
                    <th class="p-0 min-w-150px"></th>
                    <th class="p-0 min-w-120px"></th>
                  </tr>
                </thead>
                <!--end::Table head-->
                <!--begin::Table body-->
                <tbody>
                  <tr v-for="(sambang, no) in reservasi_wali" :key="sambang.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-flex justify-content-center flex-column">
                          <div
                            style="cursor: pointer"
                            class="text-dark fw-bolder text-hover-primary fs-6"
                          >
                            {{ ++no }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        style="cursor: pointer"
                        class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >
                        {{ sambang.wali.nama_wali }}
                      </div>
                      <span class="text-muted fw-bold d-block">{{
                        sambang.wali.nik
                      }}</span>
                    </td>
                    <td class="text-start fw-bold">
                      {{ sambang.wali.status }}
                    </td>
                  </tr>
                </tbody>
                <!--end::Table body-->
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
    <div class="row text-center">
      <div class="col-12">
        <a @click="$router.go(-1)" class="btn btn-danger"> Kembali </a>
      </div>
    </div>
    <!--end::Row-->
  </div>
</template>

<script>
import Konfirmasi from "@/components/Konfirmasi.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "DetailReservasi",
  components: {
    Konfirmasi,
  },
  data() {
    return {
      no: 1,
      reservasi_santri: [],
      reservasi_wali: [],
    };
  },
  methods: {
    setSettingSambang(data) {
      this.reservasi = data;
    },
  },
  mounted() {
    axios
      .get("/reservasi/" + this.$route.params.id)
      .then((r) => {
        this.reservasi_santri = r.data.data.reservasi_santris;
        this.reservasi_wali = r.data.data.reservasi_walis;
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
