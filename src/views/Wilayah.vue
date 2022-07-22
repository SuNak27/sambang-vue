<template>
  <div class="wilayah">
    <!--begin::Row-->
    <CrudOnePage v-bind="crudOnePage" @modal="closeModal" />
    <Crud
      v-bind="{
        multipleUrl: [{ url: '/wilayah' }],
      }"
      @multipleResponse="multipleUrl"
    />
    <div class="row g-5 g-xl-8">
      <div class="card mb-5 mb-xl-8">
        <div class="card-header">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Data Wilayah</span>
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
                data-bs-target="#tambah_wilayah"
                type="button"
                @mouseover="crud(null, null, 'create')"
                >Tambah Data</a
              >
            </div>
          </div>
        </div>
        <div class="card-body py-3">
          <div class="table-responsive">
            <table
              id="wilayah_table"
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
                  <th class="w-100px text-center">Nama Wilayah</th>
                  <th class="w-100px text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(wilayah, no) in setWilayah.data"
                  :key="wilayah.id_wilayah"
                  class="text-center"
                  :class="wilayah.status == 'Nonaktif' ? 'text-danger' : ''"
                >
                  <td>{{ ++no }}</td>
                  <td>{{ wilayah.nama_wilayah }}</td>
                  <td class="text-center">
                    <a
                      data-toggle="tooltip"
                      data-bs-toggle="modal"
                      :data-bs-target="'#edti_wilayah_' + wilayah.id_wilayah"
                      data-placement="top"
                      title="Edit"
                      @mouseover="
                        crud(
                          wilayah.id_wilayah,
                          wilayah,
                          'read',
                          'View Data Wilayah'
                        )
                      "
                      href="#"
                      class="
                        btn btn-icon btn-bg-light btn-active-text-primary btn-sm
                        me-1
                      "
                      ><span class="bi bi-eye" aria-hidden="true"></span
                    ></a>
                    <a
                      data-toggle="tooltip"
                      data-bs-toggle="modal"
                      :data-bs-target="'#edti_wilayah_' + wilayah.id_wilayah"
                      data-placement="top"
                      title="Edit"
                      @mouseover="
                        crud(
                          wilayah.id_wilayah,
                          wilayah,
                          'update',
                          'Edit Data Wilayah'
                        )
                      "
                      href="#"
                      class="
                        btn btn-icon btn-bg-light btn-active-text-primary btn-sm
                        me-1
                      "
                      ><span class="bi bi-pencil" aria-hidden="true"></span
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
import CrudOnePage from "@/components/CrudOnePage.vue";
import $ from "jquery";
import moment from "moment";
import Crud from "@/components/Crud.vue";
export default {
  name: "Shift",
  components: {
    CrudOnePage,
    Crud,
  },
  data() {
    return {
      no: 1,
      setWilayah: [],
      edit: 0,
      crudOnePage: {},
      crudField: [
        {
          type: "text",
          title: "Nama Wilayah",
          name: "nama_wilayah",
          required: true,
        },
        {
          type: "select",
          title: "Status",
          name: "status",
          required: true,
          data: [
            {
              text: "Aktif",
              value: "Aktif",
            },
            {
              text: "Nonaktif",
              value: "Nonaktif",
            },
          ],
          value: "",
        },
      ],
      defaultField: [],
    };
  },
  methods: {
    formatTime(time) {
      return moment(time, "HH:mm:ss").format("HH:mm");
    },
    multipleUrl(value) {
      if (value.url == "/wilayah") {
        this.setWilayah = value;
        $(document).ready(function () {
          $("#wilayah_table").DataTable({
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
    crud(id, data, crud, title) {
      if (crud == "create") {
        for (let i = 0; i < this.crudField.length; i++) {
          const element = this.crudField[i];
          element.value = "";
        }
        this.crudOnePage = {
          idmodal: "tambah_wilayah",
          crud: "create",
          name: "Tambah Data Wilayah",
          fields: this.crudField,
          url: "/wilayah",
          method: "post",
          fieldDefaultAxios: this.defaultField,
        };
      } else {
        for (let i = 0; i < this.crudField.length; i++) {
          const element = this.crudField[i];
          Object.keys(data).map(function (key) {
            if (key == element.name) {
              element.value = data[key];
            }
          });
          if (element.type == "select") {
            element.selected = element.data.find(
              (option) => option.value == element.value
            );
          }
        }

        this.crudOnePage = {
          idmodal: "edti_wilayah_" + id,
          crud: crud,
          name: title,
          fields: this.crudField,
          url: "/wilayah/" + id,
          method: "put",
          fieldDefaultAxios: this.defaultField,
        };
      }
    },
  },
};
</script>
