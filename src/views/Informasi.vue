<template>
  <div class="home">
    <!--begin::Row-->
    <CrudOnePage v-bind="crudOnePage" @modal="closeModal" />
    <Crud
      v-bind="{
        multipleUrl: [{ url: '/informasi' }],
      }"
      @multipleResponse="multipleUrl"
    />
    <div class="row g-5 g-xl-8">
      <div class="card mb-5 mb-xl-8">
        <div class="card-header">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Pusat Informasi</span>
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
              id="informasi_table"
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
                  <th class="w-100px text-center">Nama Informasi</th>
                  <th class="w-100px text-center">Tanggal Mulai</th>
                  <th class="w-100px text-center">tanggal Selesai</th>
                  <th class="w-100px text-center">Status Kunjungan</th>
                  <th class="w-100px text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(informasi, no) in setInformasi.data"
                  :key="informasi.id_informasi"
                  class="text-center"
                  :class="informasi.status == 'Nonaktif' ? 'text-danger' : ''"
                >
                  <td>{{ ++no }}</td>
                  <td>{{ informasi.nama_informasi }}</td>
                  <td>{{ informasi.tanggal_mulai }}</td>
                  <td>{{ informasi.tanggal_akhir }}</td>
                  <td>{{ informasi.status }}</td>
                  <td class="text-center">
                    <a
                      data-toggle="tooltip"
                      data-bs-toggle="modal"
                      :data-bs-target="
                        '#edit_informasi_' + informasi.id_informasi
                      "
                      data-placement="top"
                      title="Edit"
                      @mouseover="
                        crud(
                          informasi.id_informasi,
                          informasi,
                          'read',
                          'View Data'
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
                      :data-bs-target="
                        '#edit_informasi_' + informasi.id_informasi
                      "
                      data-placement="top"
                      title="Edit"
                      @mouseover="
                        crud(
                          informasi.id_informasi,
                          informasi,
                          'update',
                          'Edit Data Informasi'
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
      setInformasi: [],
      edit: 0,
      crudOnePage: {},
      crudField: [
        {
          type: "text",
          title: "Nama Informasi",
          name: "nama_informasi",
          required: true,
        },
        {
          type: "textarea",
          title: "Detail Informasi",
          name: "detail_informasi",
          required: true,
        },
        {
          type: "date",
          title: "Tanggal Mulai",
          name: "tanggal_mulai",
          required: true,
        },
        {
          type: "date",
          title: "Tanggal Selesai",
          name: "tanggal_akhir",
          required: true,
        },
        {
          type: "select",
          title: "Status Kunjungan",
          name: "status",
          required: true,
          data: [
            {
              text: "Dibuka",
              value: "Buka",
            },
            {
              text: "Ditutup",
              value: "Tutup",
            },
          ],
          value: "",
        },
      ],
      defaultField: [],
    };
  },
  methods: {
    multipleUrl(value) {
      if (value.url == "/informasi") {
        this.setInformasi = value;
        $(document).ready(function () {
          $("#informasi_table").DataTable({
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
          idmodal: "tambah_informasi",
          crud: "create",
          name: "Tambah Data Informasi",
          fields: this.crudField,
          url: "/informasi",
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
          idmodal: "edit_informasi_" + id,
          crud: crud,
          name: title,
          fields: this.crudField,
          url: "/informasi/" + id,
          method: "put",
          fieldDefaultAxios: this.defaultField,
        };
      }
    },
  },
};
</script>
