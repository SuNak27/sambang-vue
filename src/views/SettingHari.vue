<template>
  <div class="hari">
    <!--begin::Row-->
    <CrudOnePage v-bind="crudOnePage" @modal="closeModal" />
    <Crud
      v-bind="{
        multipleUrl: [{ url: '/hari' }, { url: '/shift' }, { url: '/wilayah' }],
      }"
      @multipleResponse="multipleUrl"
    />
    <div class="row g-5 g-xl-8">
      <div class="card mb-5 mb-xl-8">
        <div class="card-header">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1"
              >Data Setting Hari</span
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
                data-bs-target="#tambah_hari"
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
              id="hari_table"
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
                  <th class="w-100px text-center">Nama Hari</th>
                  <th class="w-100px text-center">Shift</th>
                  <th class="w-100px text-center">Wilayah</th>
                  <th class="w-100px text-center">Status Hari</th>
                  <th class="w-100px text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(hari, no) in setHari.data"
                  :key="hari.id_hari"
                  class="text-center"
                  :class="hari.status == 'Nonaktif' ? 'text-danger' : ''"
                >
                  <td>{{ ++no }}</td>
                  <td>{{ hari.nama }}</td>
                  <td>{{ hari.nama_shift }}</td>
                  <td>{{ hari.nama_wilayah }}</td>
                  <td>{{ hari.status_hari }}</td>
                  <td class="text-center">
                    <a
                      data-toggle="tooltip"
                      data-bs-toggle="modal"
                      :data-bs-target="'#edit_shift_' + hari.id_hari"
                      data-placement="top"
                      title="Edit"
                      @mouseover="crud(hari.id_hari, hari, 'update')"
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
  name: "SettingHari",
  data() {
    return {
      no: 1,
      setHari: [],
      crudOnePage: {},
      crudField: [
        {
          type: "text",
          title: "Nama Hari",
          name: "nama",
          required: true,
        },
        {
          type: "select",
          title: "Status Hari",
          name: "status_hari",
          required: true,
          data: [
            {
              text: "Santri",
              value: "Santri",
            },
            {
              text: "Santriwati",
              value: "Santriwati",
            },
          ],
          value: "",
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
  components: {
    Crud,
    CrudOnePage,
  },
  methods: {
    multipleUrl(value) {
      if (value.url == "/hari") {
        this.setHari = value;
        $(document).ready(function () {
          $("#hari_table").DataTable({
            responsive: true,
            ordering: false,
          });
        });
      } else if (value.url == "/shift") {
        const custom = {
          type: "select",
          title: "Shift",
          name: "id_shift",
          required: true,
          data: value.data.map((item) => {
            return {
              value: item.id_shift,
              text:
                item.nama_shift +
                " / " +
                item.jam_mulai +
                "-" +
                item.jam_selesai,
            };
          }),
          value: "",
        };
        this.crudField.splice(1, 0, custom);
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
        this.crudField.splice(2, 0, custom);
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
    crud(id, data, crud) {
      if (crud == "create") {
        for (let i = 0; i < this.crudField.length; i++) {
          const element = this.crudField[i];
          element.value = "";
        }
        this.crudOnePage = {
          idmodal: "tambah_hari",
          crud: "create",
          name: "Tambah Data Hari",
          fields: this.crudField,
          url: "/hari",
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
          idmodal: "edit_shift_" + id,
          crud: "update",
          name: "Edit Data Hari",
          fields: this.crudField,
          url: "/hari/" + id,
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