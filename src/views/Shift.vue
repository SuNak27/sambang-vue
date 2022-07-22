<template>
  <div class="home">
    <!--begin::Row-->
    <CrudOnePage v-bind="crudOnePage" @modal="closeModal" />
    <Crud
      v-bind="{
        multipleUrl: [{ url: '/shift' }],
      }"
      @multipleResponse="multipleUrl"
    />
    <div class="row g-5 g-xl-8">
      <div class="card mb-5 mb-xl-8">
        <div class="card-header">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Data Shift</span>
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
                data-bs-target="#tambah_shift"
                type="button"
                @mouseover="crud(null, null, 'create')"
                >Tambah Data Shift</a
              >
            </div>
          </div>
        </div>
        <div class="card-body py-3">
          <div class="table-responsive">
            <table
              id="shift_table"
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
                  <th class="w-100px text-center">Nama Shift</th>
                  <th class="w-100px text-center">Jam Mulai</th>
                  <th class="w-100px text-center">Jam Akhir</th>
                  <th class="w-100px text-center">Kapasitas</th>
                  <th class="w-100px text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(shift, no) in setShift.data"
                  :key="shift.id"
                  class="text-center"
                >
                  <td>{{ ++no }}</td>
                  <td>{{ shift.nama_shift }}</td>
                  <td>{{ formatTime(shift.jam_mulai) }} WIB</td>
                  <td>{{ formatTime(shift.jam_selesai) }} WIB</td>
                  <td>{{ shift.kapasitas }}</td>
                  <td class="text-center">
                    <a
                      data-toggle="tooltip"
                      data-bs-toggle="modal"
                      :data-bs-target="'#edit_shift_' + shift.id_shift"
                      data-placement="top"
                      title="Edit"
                      @mouseover="crud(shift.id_shift, shift, 'update')"
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
      setShift: [],
      edit: 0,
      crudOnePage: {},
      crudField: [
        {
          type: "text",
          title: "Nama Shift",
          name: "nama_shift",
          required: true,
        },
        {
          type: "time",
          title: "Jam Masuk",
          name: "jam_mulai",
          required: true,
        },
        {
          type: "time",
          title: "Jam Selesai",
          name: "jam_selesai",
          required: true,
        },
        {
          type: "number",
          title: "Kapasitas",
          name: "kapasitas",
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
      if (value.url == "/shift") {
        this.setShift = value;
        $(document).ready(function () {
          $("#shift_table").DataTable({
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
    crud(id, data, crud) {
      if (crud == "create") {
        for (let i = 0; i < this.crudField.length; i++) {
          const element = this.crudField[i];
          element.value = "";
        }
        this.crudOnePage = {
          idmodal: "tambah_shift",
          crud: "create",
          name: "Tambah Data Shift",
          fields: this.crudField,
          url: "/shift",
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
          name: "Edit Data Shift",
          fields: this.crudField,
          url: "/shift/" + id,
          method: "put",
          fieldDefaultAxios: this.defaultField,
        };
      }
    },
  },
};
</script>
