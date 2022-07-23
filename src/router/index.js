import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../components/layouts/Dashboard.vue";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import SettingHari from "../views/SettingHari.vue";
import Shift from "../views/Shift.vue";
import Santri from "../views/Santri.vue";
import Wilayah from "../views/Wilayah.vue";
import Lembaga from "../views/Lembaga.vue";
import Informasi from "../views/Informasi.vue";
import Reservasi from "../views/Reservasi.vue";
import TambahReservasi from "../views/TambahReservasi.vue";
import DetailReservasi from "../views/DetailReservasi.vue";
import History from "../views/History.vue";
import Print from "../views/Print.vue";

import axios from "axios";
import NProgress from "nprogress";
import "@/assets/css/nprogress.css";

// axios.defaults.headers.common["X-Sambang-Token"] =
//   localStorage.getItem("token");

// axios.defaults.baseURL = "https://api-sambang.belanj.id/api/";
axios.defaults.baseURL = "http://localhost:3000/api/";
NProgress.configure({ showSpinner: false });
axios.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/",
    component: Dashboard,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
          title: "Home",
        },
      },
      {
        path: "/hari",
        name: "SettingHari",
        component: SettingHari,
        meta: {
          is_admin: true,
          title: "Setting Hari",
        },
      },
      {
        path: "/shift",
        name: "Shift",
        component: Shift,
        meta: {
          is_admin: true,
          title: "Shift",
        },
      },
      {
        path: "/reservasi",
        name: "Reservasi",
        component: Reservasi,
        meta: {
          title: "Reservasi",
        },
      },
      {
        path: "/tambah_reservasi",
        name: "Tambah Reservasi",
        component: TambahReservasi,
        meta: {
          title: "Tambah Rservasi",
        },
      },
      {
        path: "/reservasi/:id",
        name: "Detail Reservasi",
        component: DetailReservasi,
        meta: {
          title: "Detail Reservasi",
        },
      },
      {
        path: "/history",
        name: "History",
        component: History,
        meta: {
          title: "History",
        },
      },
      {
        path: "/print",
        name: "Print",
        component: Print,
        meta: {
          title: "Print",
        },
      },
      {
        path: "/informasi",
        name: "Informasi",
        component: Informasi,
        meta: {
          is_admin: true,
          title: "Informasi",
        },
      },
      {
        path: "/santri",
        name: "Santri",
        component: Santri,
        meta: {
          is_admin: true,
          title: "Santri",
        },
      },
      {
        path: "/wilayah",
        name: "Wilayah",
        component: Wilayah,
        meta: {
          is_admin: true,
          title: "Wilayah",
        },
      },
      {
        path: "/lembaga",
        name: "Lembaga",
        component: Lembaga,
        meta: {
          is_admin: true,
          title: "Lembaga",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`;
  next();
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");
//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split(".")[1]));
//     } catch (e) {
//       return null;
//     }
//   };
//   document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`;
//   next();
//   if (to.name !== "Login" && token == null) {
//     next({ name: "Login" });
//   } else if (to.name === "Login" && token) {
//     next({ path: "/" });
//   } else {
//     if (to.matched.some((record) => record.meta.is_admin)) {
//       if (parseJwt(token).role === "sysadmin") {
//         next();
//       } else {
//         next({ path: "/" });
//       }
//     } else {
//       next();
//     }
//   }
// });

export default router;
