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
    multipleUrl: Array,
    url: String,
    method: String,
    headers: Object,
    type: String,
    fileName: String,
  },
  methods: {
    multipleUrls() {
      axios.all(
        this.multipleUrl.map((endpoint) =>
          axios
            .get(endpoint.url)
            .then((response) => {
              if (response.status == 200) {
                this.success = true;
                response.data.url = endpoint.url;
                this.$emit("multipleResponse", response.data);
              } else {
                this.success = false;
                this.$emit("data", {});
              }
            })
            .catch((error) => {
              this.success = false;
              Swal.fire({
                title: "Error Code : " + error.response.status,
                text: error.response.statusText,
                icon: "error",
                buttonsStyling: !1,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Coba lagi!",
                denyButtonText: `Detail`,
                cancelButtonText: `Tutup`,
                customClass: {
                  confirmButton: "btn btn-primary",
                  denyButton: "btn btn-info",
                  cancelButton: "btn btn-danger",
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.go();
                  this.$emit("success", false);
                } else if (result.isDenied) {
                  Swal.fire({
                    title: "Error Detail",
                    text: error.response.data.message,
                    icon: "info",
                    buttonsStyling: !1,
                    confirmButtonText: "Refresh halaman!",
                    denyButtonText: `Detail`,
                    cancelButtonText: `Tutup`,
                    customClass: {
                      confirmButton: "btn btn-primary",
                    },
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.$router.go();
                      this.$emit("success", false);
                    }
                  });
                }
              });
            })
        )
      );
    },
  },
  mounted() {
    if (this.type == "download" && this.type != null) {
      axios({
        method: "get",
        url: this.url,
        headers: this.headers,
      }).then((r) => {
        var fileURL = window.URL.createObjectURL(new Blob([r.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", this.fileName);
        document.body.appendChild(fileLink);

        fileLink.click();
        this.$emit("success", false);
      });
    } else if (this.multipleUrl != null) {
      this.multipleUrls();
    } else if (this.data == null && this.bulkData == null) {
      axios({
        method: "get",
        url: this.url,
        headers: this.headers,
      }).then((response) => {
        if (response.status == 200) {
          this.success = true;
          this.$emit("data", response.data);
        } else {
          this.success = false;
          this.$emit("data", {});
        }
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
              console.log("resp res", response);
              Swal.close();
              return response;
            },
            (error) => {
              Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
                buttonsStyling: !1,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Coba lagi!",
                denyButtonText: `Detail`,
                cancelButtonText: `Tutup`,
                customClass: { confirmButton: "btn btn-primary" },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$emit("success", false);
                  return Promise.reject(error);
                }
              });
              return Promise.reject(error);
            }
          );

          axios({
            method: this.method,
            url: this.url,
            data: this.data,
            headers: this.headers,
          })
            .then((response) => {
              if (response.status != 201) {
                console.log(response);
                Swal.fire({
                  title: "Error",
                  icon: "error",
                  buttonsStyling: !1,
                  confirmButtonText: "Coba Lagi!",
                  allowEnterKey: false,
                  showDenyButton: true,
                  showCancelButton: true,
                  denyButtonText: `Detail`,
                  cancelButtonText: `Tutup`,
                  customClass: {
                    confirmButton: "btn btn-primary",
                    denyButton: "btn btn-info",
                    cancelButton: "btn btn-danger",
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
                    this.$emit("success", false);
                    this.$emit("data", {});
                    this.$router.go();
                  }
                });
              }
            })
            .catch((error) => {
              console.log("catch", error);
              Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
                buttonsStyling: !1,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Coba lagi!",
                denyButtonText: `Detail`,
                cancelButtonText: `Tutup`,
                customClass: {
                  confirmButton: "btn btn-primary",
                  denyButton: "btn btn-info",
                  cancelButton: "btn btn-danger",
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$emit("success", false);
                } else if (result.isDenied) {
                  Swal.fire({
                    title: "Error Detail",
                    text: error.response.data.error
                      ? error.response.data.error
                      : "",
                    icon: "info",
                    showCancelButton: true,
                    buttonsStyling: !1,
                    confirmButtonText: "Refresh halaman!",
                    cancelButtonText: `Tutup`,
                    customClass: {
                      confirmButton: "btn btn-primary",
                      cancelButton: "btn btn-danger",
                    },
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.$router.go();
                      this.$emit("success", false);
                    } else {
                      this.$emit("success", false);
                    }
                  });
                } else {
                  this.$emit("success", false);
                }
              });
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
          axios.interceptors.request.use(
            // (config) => {
            //   Swal.fire({
            //     title: "Loading...",
            //     allowOutsideClick: false,
            //     allowEscapeKey: false,
            //     showConfirmButton: false,
            //     onBeforeOpen: () => {
            //       Swal.showLoading();
            //     },
            //   });
            //   return config;
            // },
            (request) => {
              return request;
            }
          );

          axios.interceptors.response.use(
            (response) => {
              Swal.close();
              return response;
            },
            (error) => {
              console.log("err res data: ", error);
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