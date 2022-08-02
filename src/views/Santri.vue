<template>
  <div class="santri">
    <!--begin::Row-->
    <CrudOnePage v-bind="crudOnePage" @modal="closeModal" />
    <Crud
      v-bind="{
        multipleUrl: [
          { url: '/santri' },
          { url: '/lembaga' },
          { url: '/wilayah' },
        ],
      }"
      @multipleResponse="multipleUrl"
    />
    <div class="row g-5 g-xl-8">
      <div class="card mb-5 mb-xl-8">
        <div class="card-header">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Data Santri</span>
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
                data-bs-target="#tambah_santri"
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
              id="santri_table"
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
                  <th class="w-100px text-center">NIS</th>
                  <th class="w-100px text-center">Nama Santri</th>
                  <th class="w-100px text-center">Wilayah</th>
                  <th class="w-100px text-center">Lembaga</th>
                  <th class="w-100px text-center">Jenis Kelamin</th>
                  <th class="w-100px text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(santri, no) in setSantri.data"
                  :key="santri.id_santri"
                  class="text-center"
                >
                  <td>{{ ++no }}</td>
                  <td>{{ santri.nis }}</td>
                  <td>{{ santri.nama }}</td>
                  <td>{{ santri.nama_wilayah }}</td>
                  <td>{{ santri.nama_lembaga }}</td>
                  <td>
                    {{ santri.jenkel == "L" ? "Laki - Laki" : "Perempuan" }}
                  </td>
                  <td class="text-center">
                    <a
                      data-toggle="tooltip"
                      data-bs-toggle="modal"
                      :data-bs-target="'#edit_santri_' + santri.id_santri"
                      data-placement="top"
                      title="View"
                      @mouseover="
                        crud(
                          santri.id_santri,
                          santri,
                          'read',
                          'View Data Santri'
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
                      :data-bs-target="'#edit_santri_' + santri.id_santri"
                      data-placement="top"
                      title="Edit"
                      @mouseover="
                        crud(
                          santri.id_santri,
                          santri,
                          'update',
                          'Edit Data Santri'
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
    <!--end::Row-->
  </div>
</template>

<script>
import Crud from "@/components/Crud.vue";
import CrudOnePage from "@/components/CrudOnePage.vue";
import $ from "jquery";
export default {
  name: "Santri",
  components: {
    Crud,
    CrudOnePage,
  },
  data() {
    return {
      no: 1,
      setSantri: [],
      crudOnePage: {},
      crudField: [
        {
          type: "number",
          title: "NIS Santri",
          name: "nis",
          required: true,
        },
        {
          type: "text",
          title: "Nama Santri",
          name: "nama",
          required: true,
        },
        {
          type: "select",
          title: "Jenis Kelamin",
          name: "jenkel",
          required: true,
          data: [
            {
              text: "Laki - Laki",
              value: "L",
            },
            {
              text: "Perempuan",
              value: "P",
            },
          ],
          value: "",
        },
        {
          type: "textarea",
          title: "Alamat",
          name: "alamat",
          required: true,
        },
      ],
      defaultField: [],
    };
  },
  methods: {
    multipleUrl(value) {
      if (value.url == "/santri") {
        this.setSantri = value;
        $(document).ready(function () {
          $("#santri_table").DataTable({
            responsive: true,
            ordering: false,
          });
        });
      } else if (value.url == "/lembaga") {
        const custom = {
          type: "select",
          title: "Lembaga",
          name: "id_lembaga",
          required: true,
          data: value.data.map((item) => {
            return {
              value: item.id_lembaga,
              text: item.nama_lembaga,
            };
          }),
          value: "",
        };
        this.crudField.splice(3, 0, custom);
      } else if (value.url == "/wilayah") {
        const custom = {
          type: "select",
          title: "Wilayah",
          name: "id_wilayah",
          required: true,
          data: value.data.map((item) => {
            return {
              value: item.id_wilayah,
              text: item.nama_wilayah,
            };
          }),
          value: "",
        };
        this.crudField.splice(4, 0, custom);
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
          idmodal: "tambah_santri",
          crud: "create",
          name: "Tambah Data Santri",
          fields: this.crudField,
          url: "/santri",
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
          idmodal: "edit_santri_" + id,
          crud: crud,
          name: title,
          fields: this.crudField,
          url: "/santri/" + id,
          method: "put",
          fieldDefaultAxios: this.defaultField,
        };
      }
    },
  },
};
</script>

<style>
</style>