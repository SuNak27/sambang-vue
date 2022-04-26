import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../components/layouts/Dashboard.vue";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import SettingHari from "../views/SettingHari.vue";
import Shift from "../views/Shift.vue";
import Reservasi from "../views/Reservasi.vue";
import TambahReservasi from "../views/TambahReservasi.vue";
import DetailReservasi from "../views/DetailReservasi.vue";
import History from "../views/History.vue";
import Informasi from "../views/Informasi.vue";
import Print from "../views/Print.vue";

import axios from "axios";

axios.defaults.headers.common["X-Sambang-Token"] =
  localStorage.getItem("token");

axios.defaults.baseURL = "http://localhost:3000/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: Dashboard,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/settingHari",
        name: "Setting Hari",
        component: SettingHari,
        meta: {
          is_admin: true,
        },
      },
      {
        path: "/shift",
        name: "Shift",
        component: Shift,
        meta: {
          is_admin: true,
        },
      },
      {
        path: "/reservasi",
        name: "Reservasi",
        component: Reservasi,
      },
      {
        path: "/tambah_reservasi",
        name: "Tambah Reservasi",
        component: TambahReservasi,
      },
      {
        path: "/reservasi/:id",
        name: "Detail Reservasi",
        component: DetailReservasi,
      },
      {
        path: "/history",
        name: "History",
        component: History,
      },
      {
        path: "/print",
        name: "Print",
        component: Print,
      },
      {
        path: "/informasi",
        name: "Informasi",
        component: Informasi,
        meta: {
          is_admin: true,
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
  const token = localStorage.getItem("token");
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
  if (to.name !== "Login" && token == null) {
    next({ name: "Login" });
  } else if (to.name === "Login" && token) {
    next({ path: "/" });
  } else {
    if (to.matched.some((record) => record.meta.is_admin)) {
      if (parseJwt(token).role === "sysadmin") {
        next();
      } else {
        next({ path: "/" });
      }
    } else {
      next();
    }
  }
});

export default router;
