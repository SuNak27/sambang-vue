<template>
  <div class="mahrom">
    <Crud
      v-bind="{
        multipleUrl: [{ url: '/mahrom' }],
      }"
      @multipleResponse="multipleUrl"
    />
    <div class="row g-5 g-xl-8">
      <div class="card mb-5 mb-xl-8">
        <div class="card-header">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Data Mahrom</span>
          </h3>
          <div class="card-toolbar"></div>
        </div>
        <div class="card-body py-3">
          <div class="table-responsive">
            <table
              id="mahrom_table"
              class="table table-bordered dt-responsive nowrap"
              style="width: 100%"
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
                  <th class="w-100px text-center">No Mahrom</th>
                  <th class="w-100px text-center">Nama Wali</th>
                  <th class="w-100px text-center">No. KK</th>
                  <th class="w-100px text-center">NIK</th>
                  <th class="w-100px text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(mahrom, no) in setMahrom.data"
                  :key="mahrom.id_mahrom"
                  class="text-center"
                  :class="mahrom.status == 'Nonaktif' ? 'text-danger' : ''"
                >
                  <td>{{ ++no }}</td>
                  <td>{{ mahrom.no_mahrom }}</td>
                  <td>{{ mahrom.nama_wali }}</td>
                  <td>{{ mahrom.no_kk }}</td>
                  <td>{{ mahrom.nik }}</td>
                  <td class="text-center">
                    <a
                      data-toggle="tooltip"
                      data-bs-toggle="modal"
                      :data-bs-target="'#edti_lembaga_' + mahrom.id_mahrom"
                      data-placement="top"
                      title="Edit"
                      @mouseover="
                        crud(
                          mahrom.id_mahrom,
                          mahrom,
                          'read',
                          'View Data mahrom'
                        )
                      "
                      href="#"
                      class="
                        btn btn-icon btn-bg-light btn-active-text-primary btn-sm
                        me-1
                      "
                      ><span class="bi bi-eye" aria-hidden="true"></span
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--end::Table container-->

    <!--end::Row-->
  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
import Crud from "@/components/Crud.vue";
export default {
  name: "Mahrom",
  components: {
    Crud,
  },
  data() {
    return {
      no: 1,
      setMahrom: [],
      edit: 0,
    };
  },
  methods: {
    formatTime(time) {
      return moment(time, "HH:mm:ss").format("HH:mm");
    },
    multipleUrl(value) {
      if (value.url == "/mahrom") {
        this.setMahrom = value;
        $(document).ready(function () {
          $("#mahrom_table").DataTable({
            responsive: true,
            ordering: false,
          });
        });
      }
    },
    closeModal(r) {
      if (r == false) {
        for (let i = 0; i < this.crudField.length; i++) {
          const element = this.crudField[i];
          element.value = "";
          delete element.selected;
        }
      }
    },
  },
};
</script>
