<template>
  <div
    class="modal fade"
    :id="idmodal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
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
            @click="closeModal"
          >
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
              <h1 class="mb-3">{{ name }}</h1>
            </div>
            <!--end::Heading-->
            <!--begin::Input group-->

            <div
              class="d-flex flex-column mb-8 fv-row"
              v-for="field in fields_local"
              :key="counter + field.name"
            >
              <!-- <div v-if="field">{{ field.name + "For" }}</div> -->
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span :class="field.required != null ? 'required' : ''">{{
                  field.title
                }}</span>
              </label>
              <!-- <div v-if="field.selected">{{ field.selected.text }}</div> -->

              <template v-if="field.type == 'select'">
                <Multiselect
                  @select="
                    (op) => {
                      field.selected = op;
                      $nextTick(() => {
                        counter += 1;
                      });
                    }
                  "
                  :options="field.data"
                  :placeholder="'Pilih data ' + field.title"
                  :value="field.selected"
                  :disabled="crud == 'read' ? true : false"
                  label="text"
                  track-by="value"
                />
              </template>

              <template v-else-if="field.type == 'textarea'">
                <textarea
                  :readonly="crud == 'read' ? true : false"
                  class="form-control"
                  v-model="field.value"
                  rows="3"
                ></textarea>
              </template>

              <template v-else-if="field.type == 'checkbox'">
                <div
                  class="
                    form-check form-switch form-check-custom form-check-solid
                  "
                >
                  <input
                    class="form-check-input"
                    :type="field.type"
                    @change="counter += 1"
                    v-model="field.value"
                    :readonly="crud == 'read' ? true : false"
                    :checked="
                      field.value == true || field.value == '1'
                        ? 'checked'
                        : 'asdasdd'
                    "
                    id="status"
                  />
                  <label class="form-check-label" for="status">
                    {{ field.value == true ? "Aktif" : "Tidak Aktif" }}
                  </label>
                </div>
              </template>

              <template v-else>
                <input
                  :readonly="crud == 'read' ? true : false"
                  :type="field.type"
                  v-model="field.value"
                  class="form-control"
                />
              </template>

              <span v-if="field.footNote != null" class="text-small mt-1"
                ><i>{{ field.footNote }}</i></span
              >
            </div>

            <!--end::Input group-->
            <div class="text-center">
              <button
                v-if="crud != 'read'"
                type="submit"
                id="submitButtons"
                @click="simpan"
                class="btn btn-primary"
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
                  v-bind="axios"
                />
              </button>
              <button
                class="btn btn-warning ms-5"
                v-if="crud == 'read'"
                @click="crud = 'update'"
              >
                Edit Data
              </button>
              <button class="btn btn-danger ms-5" data-bs-dismiss="modal">
                {{ crud == "read" ? "Tutup" : "Batal" }}
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
// import VSelect from "vue-select";
import Multiselect from "vue-multiselect";
import Crud from "@/components/Crud.vue";
import moment from "moment";
export default {
  components: {
    Crud,
    // VSelect,
    Multiselect,
  },
  props: {
    crud: String,
    idmodal: String,
    name: String,
    fields: Array,
    url: String,
    method: String,
    fieldDefaultAxios: Array,
  },
  data() {
    return {
      data: {},
      counter: 0,
      axios: {},
      fields_local: [],
      swal: false,
      selectedValue: {},
    };
  },
  methods: {
    show(value) {
      this.swal = value;
    },
    empty(value) {
      this.axios = value;
      this.data = value;
    },
    simpan() {
      this.data = this.fields_local.reduce(
        (obj, item) =>
          Object.assign(obj, {
            [item.name]:
              item.selected != null
                ? item.selected.value
                : item.required == null
                ? item.value == null
                  ? (item.value = null)
                  : item.value
                : item.type == "time"
                ? moment(item.value, "HH:mm:ss").format("HH:mm")
                : item.type == "checkbox"
                ? item.value === true
                  ? (item.value = "1")
                  : (item.value = "0")
                : item.value,
          }),
        {}
      );

      var e = document.querySelector("#submitButtons");
      e.setAttribute("data-kt-indicator", "on");

      if (this.fieldDefaultAxios.length > 0) {
        for (let i = 0; i < this.fieldDefaultAxios.length; i++) {
          const element = this.fieldDefaultAxios[i];
          this.data[element.name] = element.value;
        }
      }

      this.axios = {
        method: this.method,
        url: this.url,
        data: this.data,
      };
      this.swal = true;
      setTimeout(function () {
        e.removeAttribute("data-kt-indicator");
      }, 2e3);
    },
    closeModal() {
      this.$emit("modal", false);
    },
  },
  watch: {
    fields() {
      this.fields_local = [...this.fields];
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
