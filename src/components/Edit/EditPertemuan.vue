<template>
  <div
    class="modal fade"
    :id="'edit_pertemuan_' + pertemuan.id"
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
              <h1 class="mb-3">Edit Data Pertemuan / Kunjungan</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Batas Kunjungan / Bulan</span>
              </label>
              <!--end::Label-->
              <input
                type="number"
                name="batas_sambang"
                id="batas_sambang"
                v-model="pertemuan.batas_sambang"
                class="form-control"
              />
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Batas Tamu / Kunjungan</span>
              </label>
              <!--end::Label-->
              <input
                type="number"
                name="batas_tamu"
                id="batas_tamu"
                v-model="pertemuan.batas_tamu"
                class="form-control"
              />
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Batas Waktu / Kunjungan (Menit)</span>
              </label>
              <!--end::Label-->
              <input
                type="number"
                name="waktu"
                id="waktu"
                v-model="pertemuan.waktu"
                class="form-control"
              />
            </div>
            <!--end::Input group-->
            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="submit"
                id="edit_pertemuan"
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
                <Crud
                  v-if="swal"
                  @success="show"
                  @data="empty"
                  v-bind="{
                    data: pertemuan,
                    url: axios.url,
                    method: axios.method,
                  }"
                />
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
export default {
  name: "Edit{ertemuan",
  props: { res: Object },
  data() {
    return {
      pertemuan: {},
      swal: false,
      axios: {},
    };
  },
  methods: {
    show(value) {
      this.swal = value;
    },
    empty(value) {
      this.axios = value;
    },
    simpan() {
      var e = document.querySelector("#edit_pertemuan");
      e.setAttribute("data-kt-indicator", "on");
      if (
        this.pertemuan.batas_sambang != 0 &&
        this.pertemuan.batas_tamu != 0 &&
        this.pertemuan.waktu != 0
      ) {
        setTimeout(function () {
          e.removeAttribute("data-kt-indicator");
        }, 2e3);

        this.axios = {
          method: "put",
          url: "/pertemuan/" + this.pertemuan.id,
        };
        this.swal = true;
      } else {
        setTimeout(function () {
          e.removeAttribute("data-kt-indicator");
        }, 2e3);
        this.swal = true;
      }
    },
  },
  created() {
    this.pertemuan = this.res;
  },
};
</script>
