<template>
  <div></div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      success: false,
    };
  },
  props: {
    data: Object,
    bulkData: Array,
    url: String,
    method: String,
  },
  mounted() {
    if (this.url == null) {
      Swal.fire({
        text: "Terdapat data yang salah atau kosong!",
        icon: "error",
        buttonsStyling: !1,
        confirmButtonText: "Coba lagi!",
        customClass: { confirmButton: "btn btn-primary" },
      });
      this.$emit("success", false);
    } else if (this.data == null && this.bulkData == null) {
      axios({
        method: "get",
        url: this.url,
      })
        .then((response) => {
          this.success = true;
          this.$emit("data", response.data);
        })
        .catch((error) => {
          this.success = false;
          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            type: "error",
            confirmButtonText: "OK",
          });
        });
    } else if (this.bulkData == null) {
      Swal.fire({
        text: "Pastikan data sudah benar",
        showDenyButton: true,
        denyButtonText: "Batal",
        icon: "info",
        buttonsStyling: !1,
        confirmButtonText: "Simpan",
        customClass: {
          denyButton: "btn btn-danger ms-3 order-3",
          confirmButton: "btn btn-primary order-2",
        },
      }).then((result) => {
        this.$emit("data", {});
        if (result.isConfirmed) {
          axios.interceptors.request.use((config) => {
            Swal.fire({
              title: "Loading...",
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
            });
            return config;
          });

          axios.interceptors.response.use(
            (response) => {
              Swal.close();
              return response;
            },
            (error) => {
              Swal.close();
              return error;
            }
          );
          axios({
            method: this.method,
            url: this.url,
            data: this.data,
          })
            .then((response) => {
              if (response.status != 201) {
                Swal.fire({
                  title: "Error",
                  icon: "error",
                  buttonsStyling: !1,
                  confirmButtonText: "Coba Lagi!",
                  allowEnterKey: false,
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$emit("success", false);
                  }
                });
              } else {
                Swal.fire({
                  title: "Berhasil",
                  text: response.data.message,
                  icon: "success",
                  buttonsStyling: !1,
                  confirmButtonText: "Ok!",
                  allowEnterKey: false,
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$emit("success", true);
                    this.$emit("data", {});
                    this.$router.go();
                  }
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.$emit("data", {});
          this.$emit("success", false);
        }
      });
    } else {
      Swal.fire({
        text: "Pastikan data sudah benar",
        showDenyButton: true,
        denyButtonText: "Batal",
        icon: "info",
        buttonsStyling: !1,
        confirmButtonText: "Simpan",
        customClass: {
          denyButton: "btn btn-danger ms-3 order-3",
          confirmButton: "btn btn-primary order-2",
        },
      }).then((result) => {
        this.$emit("data", {});
        if (result.isConfirmed) {
          axios.interceptors.request.use((config) => {
            Swal.fire({
              title: "Loading...",
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
            });
            return config;
          });

          axios.interceptors.response.use(
            (response) => {
              Swal.close();
              return response;
            },
            (error) => {
              Swal.close();
              return error;
            }
          );
          axios({
            method: this.method,
            url: this.url,
            data: this.bulkData,
          })
            .then((response) => {
              Swal.fire({
                title: "Berhasil",
                text: response.data.message,
                icon: "success",
                buttonsStyling: !1,
                confirmButtonText: "Ok!",
                allowEnterKey: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$emit("success", true);
                  this.$emit("data", {});
                  this.$router.go();
                }
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
                buttonsStyling: !1,
                confirmButtonText: "Coba lagi!",
                customClass: { confirmButton: "btn btn-primary" },
              });
            });
        } else {
          this.$emit("data", {});
          this.$emit("success", false);
        }
      });
    }
  },
};
</script>

<style>
</style>