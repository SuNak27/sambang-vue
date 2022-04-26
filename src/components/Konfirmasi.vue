<template>
  <div
    class="modal fade"
    :id="'konfirmasi_' + id_santri"
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
          <form v-on:submit.prevent class="form" action="#">
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">Konfirmasi Santri</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span>No Mahrom</span>
              </label>
              <!--end::Label-->
              <input
                type="text"
                name="no_mahrom"
                id="no_mahrom"
                v-if="konfirmasi.data"
                v-model="konfirmasi.data.no_mahrom"
                readonly
                class="form-control form-control-solid"
              />
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span>Nama</span>
              </label>
              <!--end::Label-->
              <input
                type="text"
                name="nama"
                id="nama"
                v-if="konfirmasi.data"
                v-model="konfirmasi.data.nama"
                readonly
                class="form-control form-control-solid"
              />
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span>Wilayah</span>
              </label>
              <!--end::Label-->
              <input
                type="text"
                name="wilayah"
                id="wilayah"
                v-if="konfirmasi.data"
                v-model="konfirmasi.data.wilayah.nama_wilayah"
                readonly
                class="form-control form-control-solid"
              />
            </div>
            <!--end::Input group-->
            <div class="form-group">
              <div class="mb-10">
                <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                  <span>Lembaga</span>
                </label>
                <input
                  type="text"
                  name="lembaga"
                  id="lembaga"
                  v-if="konfirmasi.data"
                  v-model="konfirmasi.data.lembaga.nama_lembaga"
                  readonly
                  class="form-control form-control-solid"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="mb-10">
                <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                  <span>Status Santri</span>
                </label>
                <select
                  v-if="konfirmasi.data"
                  v-model="konfirmasi.data.status_santri"
                  class="selectpicker form-control form-control-md"
                >
                  <option disabled>-- Pilih Hari --</option>
                  <option>Ada</option>
                  <option>Ijin Pulang</option>
                  <option>Perjalanan</option>
                  <option>Kegiatan Pesantren</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="mb-10">
                <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                  <span>Keterangan</span>
                </label>
                <textarea
                  class="form-control"
                  id="keterangan"
                  name="keterangan"
                  v-if="konfirmasi.data"
                  v-model="konfirmasi.data.keterangan"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="submit"
                @click="simpan"
                id="konfirmasi"
                class="btn btn-primary"
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
    value: Number,
  },
  data() {
    return {
      id_santri: {},
      konfirmasi: {},
    };
  },
  methods: {
    simpan() {
      var e = document.querySelector("#konfirmasi");
      e.setAttribute("data-kt-indicator", "on");

      setTimeout(function () {
        e.removeAttribute("data-kt-indicator");
      }, 2e3);
      axios
        .put("/santri/id/" + this.konfirmasi.data.id, this.konfirmasi.data)
        .then((response) => {
          if (response.status) {
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
            });
          }
        })
        .catch((err) => {
          setTimeout(function () {
            e.removeAttribute("data-kt-indicator"),
              Swal.fire({
                title: "Gagal",
                text: err.response.data.message,
                icon: "error",
                buttonsStyling: !1,
                confirmButtonText: "Coba lagi!",
                customClass: { confirmButton: "btn btn-primary" },
              });
          }, 2e3);
        });
    },
  },
  mounted() {
    axios
      .get("/santri/id/" + this.id_santri)
      .then((response) => (this.konfirmasi = response.data))
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          this.$router.push({ path: "/login" });
        }
      });
  },
  created() {
    this.id_santri = this.value;
  },
};
</script>

<style>
</style>