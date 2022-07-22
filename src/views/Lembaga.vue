<template>
  <div class="lembaga">
    <!--begin::Row-->
    <CrudOnePage v-bind="crudOnePage" @modal="closeModal" />
    <Crud
      v-bind="{
        multipleUrl: [{ url: '/lembaga' }],
      }"
      @multipleResponse="multipleUrl"
    />
    <div class="row g-5 g-xl-8">
      <div class="card mb-5 mb-xl-8">
        <div class="card-header">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Data Lembaga</span>
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
                data-bs-target="#tambah_lembaga"
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
              id="lembaga_table"
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
                  <th class="w-100px text-center">Nama Lembaga</th>
                  <th class="w-100px text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(lembaga, no) in setLembaga.data"
                  :key="lembaga.id_lembaga"
                  class="text-center"
                  :class="lembaga.status == 'Nonaktif' ? 'text-danger' : ''"
                >
                  <td>{{ ++no }}</td>
                  <td>{{ lembaga.nama_lembaga }}</td>
                  <td class="text-center">
                    <a
                      data-toggle="tooltip"
                      data-bs-toggle="modal"
                      :data-bs-target="'#edti_lembaga_' + lembaga.id_lembaga"
                      data-placement="top"
                      title="Edit"
                      @mouseover="
                        crud(
                          lembaga.id_lembaga,
                          lembaga,
                          'read',
                          'View Data lembaga'
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
                      :data-bs-target="'#edti_lembaga_' + lembaga.id_lembaga"
                      data-placement="top"
                      title="Edit"
                      @mouseover="
                        crud(
                          lembaga.id_lembaga,
                          lembaga,
                          'update',
                          'Edit Data lembaga'
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
      setLembaga: [],
      edit: 0,
      crudOnePage: {},
      crudField: [
        {
          type: "text",
          title: "Nama lembaga",
          name: "nama_lembaga",
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
      if (value.url == "/lembaga") {
        this.setLembaga = value;
        $(document).ready(function () {
          $("#lembaga_table").DataTable({
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
          idmodal: "tambah_lembaga",
          crud: "create",
          name: "Tambah Data lembaga",
          fields: this.crudField,
          url: "/lembaga",
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
          idmodal: "edti_lembaga_" + id,
          crud: crud,
          name: title,
          fields: this.crudField,
          url: "/lembaga/" + id,
          method: "put",
          fieldDefaultAxios: this.defaultField,
        };
      }
    },
  },
};
</script>
