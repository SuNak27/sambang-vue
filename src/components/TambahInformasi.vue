<template>
  <div
    class="modal fade"
    id="tambah_informasi"
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
          <form
            id="kt_modal_new_target_form"
            v-on:submit.prevent
            class="form"
            action="#"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">Tambah Informasi</h1>
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
                name="nama_informasi"
                id="nama_informasi"
                v-model="informasi.nama_informasi"
                class="form-control"
              />
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Detail Informaso</span>
              </label>
              <!--end::Label-->
              <textarea
                class="form-control"
                v-model="informasi.detail_informasi"
                cols="20"
                rows="10"
              ></textarea>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Tanggal Mulai</span>
              </label>
              <!--end::Label-->
              <input
                type="date"
                name="tangal_mulai"
                id="tangal_mulai"
                v-model="informasi.tanggal_mulai"
                class="form-control"
              />
            </div>
            <!--end::Input group-->
            <div class="form-group">
              <div class="mb-10">
                <label for="tangal_akhir" class="form-label">
                  <span class="required">Tanggal Akhir</span>
                </label>
                <input
                  type="date"
                  name="tangal_akhir"
                  id="tangal_akhir"
                  v-model="informasi.tanggal_akhir"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group mb-10">
              <div class="">
                <label for="status_shift" class="form-label">
                  <span class="required">Status</span>
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  v-model="informasi.status"
                  value="Buka"
                />
                <label class="form-check-label">Buka</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  v-model="informasi.status"
                  value="Tutup"
                />
                <label class="form-check-label">Tutup</label>
              </div>
            </div>
            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="submit"
                id="tambah_info"
                class="btn btn-primary"
                @click="simpan"
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
  data() {
    return {
      informasi: {},
    };
  },
  methods: {
    simpan() {
      var e = document.querySelector("#tambah_info");
      e.setAttribute("data-kt-indicator", "on");
      if (
        this.informasi.nama_informasi != null &&
        this.informasi.detail_informasi != null &&
        this.informasi.tanggal_mulai != null &&
        this.informasi.tanggal_akhir != null &&
        this.informasi.status != null
      ) {
        setTimeout(function () {
          e.removeAttribute("data-kt-indicator");
        }, 2e3);
        axios
          .post("/informasi", this.informasi)
          .then(
            Swal.fire({
              title: "Berhasil",
              text: "Data telah ditambah",
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
};
</script>