<template>
  <div class="detail-mahrom">
    <Crud
      :url="'/mahrom?no_mahrom=' + $route.params.no_mahrom"
      @data="getDetailMahrom"
    />
    <div class="post d-flex flex-column-fluid" id="kt_post">
      <div id="kt_content_container" class="container-xxl">
        <div class="card card-xl-stretch mb-xl-8">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3 mb-1">Detail Mahrom</span>
            </h3>
          </div>

          <div class="card-body py-3">
            <div
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
                  <thead>
                    <tr class="border-0 fw-bolder text-muted">
                      <th class="min-w-100px text-center">No KK</th>
                      <th class="min-w-100px text-center">NIK</th>
                      <th class="min-w-100px text-center">Nama Wali</th>
                      <th class="min-w-100px text-center">No Telp</th>
                    </tr>
                  </thead>

                  <tbody class="text-center">
                    <tr>
                      <td>
                        <p
                          class="
                            text-dark
                            fw-bolder
                            text-hover-primary
                            fs-6
                            d-inline
                          "
                        >
                          {{ wali_santri.no_kk }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="
                            text-dark
                            fw-bolder
                            text-hover-primary
                            fs-6
                            d-inline
                          "
                        >
                          {{ wali_santri.nik }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="
                            text-dark
                            fw-bolder
                            text-hover-primary
                            fs-6
                            d-inline
                          "
                        >
                          {{ wali_santri.nama_wali }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="
                            text-dark
                            fw-bolder
                            text-hover-primary
                            fs-6
                            d-inline
                          "
                        >
                          {{ wali_santri.no_telp }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="flex-lg-row-fluid">
            <ul
              class="
                nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x
                border-0
                fs-4
                fw-bold
                mb-8
              "
            >
              <li class="nav-item">
                <a
                  class="nav-link text-active-primary pb-4 active"
                  data-bs-toggle="tab"
                  href="#santri"
                  >Santri</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-active-primary pb-4"
                  data-bs-toggle="tab"
                  href="#keluarga"
                  >Keluarga Non Santri</a
                >
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show" id="keluarga" role="tabpanel">
                <div class="card pt-4 mb-6 mb-xl-9">
                  <div class="card-header border-0">
                    <div class="card-title">
                      <h2>Data Keluarga / Mahrom</h2>
                    </div>
                    <div class="card-toolbar"></div>
                  </div>
                  <div class="card-body py-0">
                    <div class="table-responsive">
                      <table
                        class="
                          table
                          align-middle
                          table-row-dashed
                          fw-bold
                          text-gray-600
                          fs-6
                          gy-5
                        "
                        id="keluarga_table"
                      >
                        <thead>
                          <tr
                            class="
                              text-start text-muted
                              fw-bolder
                              fs-7
                              text-uppercase
                              gs-0
                            "
                          >
                            <th class="w-50px text-center">No</th>
                            <th class="w-100px text-center">NIK</th>
                            <th class="w-100px text-center">Nama Mahrom</th>
                            <th class="w-100px text-center">No. Telp</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="text-center"
                            v-for="(detail_mahrom, index) in keluarga"
                            :key="detail_mahrom.nik"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>{{ detail_mahrom.nik }}</td>
                            <td>{{ detail_mahrom.nama_wali }}</td>
                            <td>{{ detail_mahrom.no_telp }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade show active"
                id="santri"
                role="tabpanel"
              >
                <div class="card pt-4 mb-6 mb-xl-9">
                  <div class="card-header border-0">
                    <div class="card-title">
                      <h2>Data Santri</h2>
                    </div>

                    <div class="card-toolbar"></div>
                  </div>

                  <div class="card-body py-0">
                    <div class="table-responsive">
                      <table
                        class="
                          table
                          align-middle
                          table-row-dashed
                          fw-bold
                          text-gray-600
                          fs-6
                          gy-5
                        "
                        id="santri_table"
                      >
                        <thead>
                          <tr
                            class="
                              text-start text-muted
                              fw-bolder
                              fs-7
                              text-uppercase
                              gs-0
                            "
                          >
                            <th class="w-50px text-center">No</th>
                            <th class="w-100px text-center">Nama Santri</th>
                            <th class="w-100px text-center">Lembaga</th>
                            <th class="w-100px text-center">Wilayah</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="text-center"
                            v-for="(detail_mahrom, index) in santri"
                            :key="detail_mahrom.id_santri"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>{{ detail_mahrom.nama }}</td>
                            <td>{{ detail_mahrom.nama_lembaga }}</td>
                            <td>{{ detail_mahrom.nama_wilayah }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <router-link class="btn btn-sm btn-primary" to="/mahrom"
        >Kembali</router-link
      >
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Crud from "@/components/Crud.vue";

export default {
  name: "DetailJadwal",
  components: {
    Crud,
  },
  data() {
    return {
      no: 1,
      wali_santri: {},
      keluarga: [],
      santri: [],
    };
  },
  methods: {
    getDetailMahrom(value) {
      this.wali_santri = value.data;
      this.keluarga = value.data.keluarga;
      this.santri = value.data.santri;
      $(document).ready(function () {
        $("#keluarga_table").DataTable({
          responsive: true,
          ordering: false,
        });
      });
      $(document).ready(function () {
        $("#santri_table").DataTable({
          responsive: true,
          ordering: false,
        });
      });
    },
  },
};
</script>