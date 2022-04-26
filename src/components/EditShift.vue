<template>
  <div
    class="modal fade"
    :id="'edit_shift_' + shift.id"
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
          <form id="kt_modal_new_target_form" v-on:submit.prevent class="form">
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">Edit Data Shift</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Nama Shift</span>
              </label>
              <!--end::Label-->
              <input
                type="text"
                name="nama_shift"
                id="nama_shift"
                v-model="shift.nama_shift"
                class="form-control"
              />
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Jam Awal</span>
              </label>
              <!--end::Label-->
              <input
                type="time"
                name="jam_awal"
                id="jam_awal"
                v-model="shift.jam_awal"
                class="form-control"
              />
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Jam Akhir</span>
              </label>
              <!--end::Label-->
              <input
                type="time"
                name="jam_akhir"
                id="jam_akhir"
                v-model="shift.jam_akhir"
                class="form-control"
              />
            </div>
            <!--end::Input group-->
            <div class="form-group text-start">
              <div class="mb-10">
                <label for="jml_santri" class="form-label">Jumlah Santri</label>
                <input
                  type="number"
                  name="jml_santri"
                  id="jml_santri"
                  v-model="shift.jml_santri"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group text-start mb-10">
              <div class="">
                <label for="status_shift" class="form-label">Status</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  v-model="shift.status"
                  value="Aktif"
                />
                <label class="form-check-label">Aktif</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  v-model="shift.status"
                  value="Nonaktif"
                />
                <label class="form-check-label">Nonaktif</label>
              </div>
            </div>
            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="submit"
                id="editShift"
                class="btn btn-primary"
                @click="simpanShift"
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: {
    res: Object,
  },
  data() {
    return {
      shift: {},
    };
  },
  methods: {
    simpanShift() {
      var e = document.querySelector("#editShift");
      e.setAttribute("data-kt-indicator", "on");
      if (
        this.shift.nama_shift != "" &&
        this.shift.jam_awal != "" &&
        this.shift.jam_akhir != "" &&
        this.shift.jml_santri != "" &&
        this.shift.status != ""
      ) {
        setTimeout(function () {
          e.removeAttribute("data-kt-indicator");
        }, 2e3);
        axios
          .put("/shift/" + this.shift.id, this.shift)
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
              title: "Gagal!",
              text: "Terdapat data yang salah atau kosong! Refresh halaman untuk cancel",
              icon: "error",
              buttonsStyling: !1,
              confirmButtonText: "Coba lagi!",
              customClass: { confirmButton: "btn btn-primary" },
            });
        }, 2e3);
      }
    },
  },
  created() {
    this.shift = this.res;
  },
};
</script>