<template>
  <div
    class="modal fade"
    :id="'edit_hari_' + hari.id"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content rounded">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
            <span class="svg-icon svg-icon-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  opacity="0.5"
                  x="6"
                  y="17.3137"
                  width="16"
                  height="2"
                  rx="1"
                  transform="rotate(-45 6 17.3137)"
                  fill="black"
                />
                <rect
                  x="7.41422"
                  y="6"
                  width="16"
                  height="2"
                  rx="1"
                  transform="rotate(45 7.41422 6)"
                  fill="black"
                />
              </svg>
            </span>
            <!--end::Svg Icon-->
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->
        <!--begin::Modal body-->
        <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <!--begin:Form-->
          <form v-on:submit.prevent class="form">
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">Edit Data Hari</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Nama Hari</span>
              </label>
              <!--end::Label-->
              <VSelect
                v-model="selectedHari"
                addClass="form-control form-control-sm"
                searchPlaceholder="Cari..."
                defaultTitle="Pilih Hari"
                searchable
                :options="nama_hari"
              />
            </div>
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Nama Shift</span>
              </label>
              <!--end::Label-->
              <VSelect
                v-model="ss"
                addClass="form-control form-control-sm"
                searchPlaceholder="Cari..."
                defaultTitle="Pilih Shift"
                searchable
                :options="shift"
              />
            </div>
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Wilayah</span>
              </label>
              <!--end::Label-->
              <VSelect
                v-model="ww"
                addClass="form-control form-control-sm"
                searchPlaceholder="Cari..."
                defaultTitle="Pilih Wilayah"
                searchable
                :options="wilayah"
              />
            </div>
            <!--end::Input group-->
            <div class="form-group text-start mb-10">
              <div class="">
                <label for="status_hari" class="form-label">Status Hari</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status_hari"
                  v-model="hari.status_hari"
                  value="Santri"
                />
                <label class="form-check-label">Santri</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status_hari"
                  v-model="hari.status_hari"
                  value="Santriwati"
                />
                <label class="form-check-label">Santriwati</label>
              </div>
            </div>
            <div class="form-group text-start mb-10">
              <div class="">
                <label for="status_hari" class="form-label">Status</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  v-model="hari.status"
                  value="Aktif"
                />
                <label class="form-check-label">Aktif</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  v-model="hari.status"
                  value="Nonaktif"
                />
                <label class="form-check-label">Nonaktif</label>
              </div>
            </div>
            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="submit"
                id="editttt"
                class="btn btn-primary"
                @click="simpanHari"
              >
                <span class="indicator-label">Submit</span>
                <span class="indicator-progress"
                  >Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span
                ></span>
              </button>
            </div>
            <!--end::Actions-->
          </form>
          <!--end:Form-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
</template>

<script>
import VSelect from "vue-select-picker-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    VSelect,
  },
  props: {
    res: Object,
  },
  data() {
    return {
      nama_hari: [
        { value: "Senin", text: "Senin" },
        { value: "Selasa", text: "Selasa" },
        { value: "Rabu", text: "Rabu" },
        { value: "Kamis", text: "Kamis" },
        { value: "Jum'at", text: "Jum'at" },
        { value: "Sabtu", text: "Sabtu" },
        { value: "Minggu", text: "Minggu" },
      ],
      kapasitas: 50,
      hari: {},
      selectedHari: { value: null },
      ww: {},
      ss: {},
      shift: [],
      wilayah: [],
    };
  },
  methods: {
    simpanHari() {
      var e = document.querySelector("#editttt");
      e.setAttribute("data-kt-indicator", "on");
      if (
        this.ww != null &&
        this.ss != null &&
        this.selectedHari != null &&
        this.hari.status_hari != null &&
        this.hari.status != null
      ) {
        this.hari.kapasitas = this.kapasitas;
        this.hari.nama_hari = this.selectedHari.value;
        this.hari.id_wilayah = this.ww.value;
        this.hari.id_shift = this.ss.value;
        setTimeout(function () {
          e.removeAttribute("data-kt-indicator");
        }, 2e3);
        axios
          .put("/hari/" + this.hari.id, this.hari)
          .then(
            Swal.fire({
              title: "Berhasil",
              text: "Data telah diubah",
              icon: "success",
              buttonsStyling: !1,
              confirmButtonText: "Ok!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            }).then(() => {
              this.$router.go();
            })
          )
          .catch((error) => console.log(error));
      } else {
        setTimeout(function () {
          e.removeAttribute("data-kt-indicator"),
            Swal.fire({
              text: "Terdapat data yang salah atau kosong!",
              icon: "error",
              buttonsStyling: !1,
              confirmButtonText: "Coba lagi!",
              customClass: { confirmButton: "btn btn-primary" },
            });
        }, 2e3);
      }
    },
  },
  mounted() {
    axios
      .get("/shift")
      .then((response) => {
        this.shift = response.data.data.map((item) => {
          if (item.status == "Aktif") {
            return {
              value: item.id,
              text: item.nama_shift,
            };
          } else {
            return {
              disabled: true,
            };
          }
        });
      })
      .catch(function (error) {
        if (error.status === 401) {
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

    axios
      .get("/wilayah")
      .then(
        (response) =>
          (this.wilayah = response.data.data.map((item) => {
            return {
              value: item.id,
              text: item.nama_wilayah,
            };
          }))
      )
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
  created() {
    this.hari = this.res;
    this.selectedHari.value = this.hari.nama_hari;
    this.ss.value = this.hari.id_shift;
    this.ss.text = this.hari.shift.nama_shift;
    this.ww.value = this.hari.id_wilayah;
    this.ww.text = this.hari.wilayah.nama_wilayah;
  },
};
</script>

<style>
</style>