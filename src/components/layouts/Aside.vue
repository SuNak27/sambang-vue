<template>
  <!--begin::Aside-->
  <div
    id="kt_aside"
    class="aside aside-dark aside-hoverable"
    data-kt-drawer="true"
    data-kt-drawer-name="aside"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_aside_mobile_toggle"
  >
    <!--begin::Brand-->
    <div class="aside-logo flex-column-auto" id="kt_aside_logo">
      <!--begin::Logo-->
      <a href="#">
        <img
          alt="Logo"
          src="@/assets/img/sambang-aside-dark.png"
          class="h-25px logo"
        />
      </a>
      <!--end::Logo-->
      <!--begin::Aside toggler-->
      <div
        id="kt_aside_toggle"
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="aside-minimize"
      >
        <!--begin::Svg Icon | path: icons/duotune/arrows/arr079.svg-->
        <span class="svg-icon svg-icon-1 rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              opacity="0.5"
              d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
              fill="black"
            />
            <path
              d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
              fill="black"
            />
          </svg>
        </span>
        <!--end::Svg Icon-->
      </div>
      <!--end::Aside toggler-->
    </div>
    <!--end::Brand-->
    <!--begin::Aside menu-->
    <div class="aside-menu flex-column-fluid">
      <!--begin::Aside Menu-->
      <div
        class="hover-scroll-overlay-y my-5 my-lg-5"
        id="kt_aside_menu_wrapper"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-height="auto"
        data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
        data-kt-scroll-wrappers="#kt_aside_menu"
        data-kt-scroll-offset="0"
      >
        <!--begin::Menu-->
        <div
          class="
            menu
            menu-column
            menu-title-gray-800
            menu-state-title-primary
            menu-state-icon-primary
            menu-state-bullet-primary
            menu-arrow-gray-500
          "
          id="#kt_aside_menu"
          data-kt-menu="true"
        >
          <div class="menu-item">
            <router-link
              :class="$route.name == 'Home' ? 'menu-link active' : 'menu-link'"
              to="/"
            >
              <span class="menu-icon">
                <!--begin::Svg Icon | path: icons/duotune/general/gen025.svg-->
                <!--begin::Svg Icon | path: assets/media/icons/duotune/general/gen008.svg-->
                <span class="svg-icon svg-icon-muted svg-icon-1"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 2H10C10.6 2 11 2.4 11 3V10C11 10.6 10.6 11 10 11H3C2.4 11 2 10.6 2 10V3C2 2.4 2.4 2 3 2Z"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.3"
                      d="M14 2H21C21.6 2 22 2.4 22 3V10C22 10.6 21.6 11 21 11H14C13.4 11 13 10.6 13 10V3C13 2.4 13.4 2 14 2Z"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.3"
                      d="M3 13H10C10.6 13 11 13.4 11 14V21C11 21.6 10.6 22 10 22H3C2.4 22 2 21.6 2 21V14C2 13.4 2.4 13 3 13Z"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.3"
                      d="M14 13H21C21.6 13 22 13.4 22 14V21C22 21.6 21.6 22 21 22H14C13.4 22 13 21.6 13 21V14C13 13.4 13.4 13 14 13Z"
                      fill="currentColor"
                    /></svg
                ></span>
                <!--end::Svg Icon-->
                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">Home</span>
            </router-link>
          </div>
          <div class="menu-item" v-if="user.role == 'sysadmin'">
            <router-link
              :class="
                $route.name == 'Setting Hari' ? 'menu-link active' : 'menu-link'
              "
              to="/settingHari"
            >
              <span class="menu-icon">
                <!--begin::Svg Icon | path: assets/media/icons/duotune/files/fil002.svg-->
                <span class="svg-icon svg-icon-muted svg-icon-1"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M19 3.40002C18.4 3.40002 18 3.80002 18 4.40002V8.40002H14V4.40002C14 3.80002 13.6 3.40002 13 3.40002C12.4 3.40002 12 3.80002 12 4.40002V8.40002H8V4.40002C8 3.80002 7.6 3.40002 7 3.40002C6.4 3.40002 6 3.80002 6 4.40002V8.40002H2V4.40002C2 3.80002 1.6 3.40002 1 3.40002C0.4 3.40002 0 3.80002 0 4.40002V19.4C0 20 0.4 20.4 1 20.4H19C19.6 20.4 20 20 20 19.4V4.40002C20 3.80002 19.6 3.40002 19 3.40002ZM18 10.4V13.4H14V10.4H18ZM12 10.4V13.4H8V10.4H12ZM12 15.4V18.4H8V15.4H12ZM6 10.4V13.4H2V10.4H6ZM2 15.4H6V18.4H2V15.4ZM14 18.4V15.4H18V18.4H14Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19 0.400024H1C0.4 0.400024 0 0.800024 0 1.40002V4.40002C0 5.00002 0.4 5.40002 1 5.40002H19C19.6 5.40002 20 5.00002 20 4.40002V1.40002C20 0.800024 19.6 0.400024 19 0.400024Z"
                      fill="currentColor"
                    /></svg
                ></span>
                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">Setting Hari</span>
            </router-link>
          </div>
          <div class="menu-item" v-if="user.role == 'sysadmin'">
            <router-link
              :class="$route.name == 'Shift' ? 'menu-link active' : 'menu-link'"
              to="/shift"
            >
              <span class="menu-icon">
                <!--begin::Svg Icon | path: assets/media/icons/duotune/arrows/arr031.svg-->
                <span class="svg-icon svg-icon-muted svg-icon-1"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 13V13.5C21 16 19 18 16.5 18H5.6V16H16.5C17.9 16 19 14.9 19 13.5V13C19 12.4 19.4 12 20 12C20.6 12 21 12.4 21 13ZM18.4 6H7.5C5 6 3 8 3 10.5V11C3 11.6 3.4 12 4 12C4.6 12 5 11.6 5 11V10.5C5 9.1 6.1 8 7.5 8H18.4V6Z"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.3"
                      d="M21.7 6.29999C22.1 6.69999 22.1 7.30001 21.7 7.70001L18.4 11V3L21.7 6.29999ZM2.3 16.3C1.9 16.7 1.9 17.3 2.3 17.7L5.6 21V13L2.3 16.3Z"
                      fill="currentColor"
                    /></svg
                ></span>
                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">Shift</span>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link
              :class="
                $route.name == 'Reservasi' ||
                $route.name == 'Tambah Shift' ||
                $route.name == 'Detail Reservasi'
                  ? 'menu-link active'
                  : 'menu-link'
              "
              to="/reservasi"
            >
              <span class="menu-icon">
                <!--begin::Svg Icon | path: assets/media/icons/duotune/arrows/arr031.svg-->
                <span class="svg-icon svg-icon-muted svg-icon-1"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M6 22H4V3C4 2.4 4.4 2 5 2C5.6 2 6 2.4 6 3V22Z"
                      fill="currentColor"
                    />
                    <path
                      d="M18 14H4V4H18C18.8 4 19.2 4.9 18.7 5.5L16 9L18.8 12.5C19.3 13.1 18.8 14 18 14Z"
                      fill="currentColor"
                    /></svg
                ></span>

                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">Reservasi</span>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link
              :class="
                $route.name == 'History' ? 'menu-link active' : 'menu-link'
              "
              to="/history"
            >
              <span class="menu-icon">
                <!--begin::Svg Icon | path: assets/media/icons/duotune/files/fil011.svg-->
                <span class="svg-icon svg-icon-muted svg-icon-1"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22Z"
                      fill="currentColor"
                    />
                    <g clip-path="url(#clip0_787_1289)">
                      <path
                        d="M9.56133 15.7161C9.72781 15.5251 9.5922 15.227 9.33885 15.227H8.58033C8.57539 15.1519 8.57262 15.0763 8.57262 15C8.57262 13.1101 10.1101 11.5726 12 11.5726C12.7576 11.5726 13.4585 11.8198 14.0265 12.2377C14.2106 12.3731 14.4732 12.3609 14.6216 12.1872L15.1671 11.5491C15.3072 11.3852 15.2931 11.1382 15.1235 11.005C14.2353 10.3077 13.1468 9.92944 12 9.92944C10.6456 9.92944 9.37229 10.4569 8.41458 11.4146C7.4569 12.3723 6.92945 13.6456 6.92945 15C6.92945 15.0759 6.93135 15.1516 6.93465 15.2269H6.29574C6.0424 15.2269 5.90677 15.5251 6.07326 15.7161L7.51455 17.3693L7.81729 17.7166L8.90421 16.4698L9.56133 15.7161Z"
                        fill="currentColor"
                      />
                      <path
                        d="M17.9268 14.7516L16.8518 13.5185L16.1828 12.7511L15.2276 13.8468L14.4388 14.7516C14.2723 14.9426 14.4079 15.2407 14.6612 15.2407H15.4189C15.2949 17.0187 13.809 18.4274 12.0001 18.4274C11.347 18.4274 10.736 18.2437 10.216 17.9253C10.0338 17.8138 9.79309 17.8362 9.6543 17.9985L9.10058 18.6463C8.95391 18.8179 8.97742 19.0782 9.16428 19.2048C9.99513 19.7678 10.9743 20.0706 12.0001 20.0706C13.3545 20.0706 14.6278 19.5432 15.5855 18.5855C16.4863 17.6847 17.0063 16.5047 17.0649 15.2407H17.7043C17.9577 15.2407 18.0933 14.9426 17.9268 14.7516Z"
                        fill="currentColor"
                      />
                    </g>
                    <path
                      d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z"
                      fill="currentColor"
                    /></svg
                ></span>
                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">History</span>
            </router-link>
          </div>
          <div class="menu-item" v-if="user.role == 'sysadmin'">
            <router-link
              :class="
                $route.name == 'Informasi' ? 'menu-link active' : 'menu-link'
              "
              to="/informasi"
            >
              <span class="menu-icon">
                <!--begin::Svg Icon | path: assets/media/icons/duotune/general/gen045.svg-->
                <span class="svg-icon svg-icon-muted svg-icon-2"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      opacity="0.3"
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="10"
                      fill="currentColor"
                    />
                    <rect
                      x="11"
                      y="17"
                      width="7"
                      height="2"
                      rx="1"
                      transform="rotate(-90 11 17)"
                      fill="currentColor"
                    />
                    <rect
                      x="11"
                      y="9"
                      width="2"
                      height="2"
                      rx="1"
                      transform="rotate(-90 11 9)"
                      fill="currentColor"
                    /></svg
                ></span>
                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">Informasi</span>
            </router-link>
          </div>
          <div class="menu-item">
            <a
              :class="$route.name == 'Print' ? 'menu-link active' : 'menu-link'"
              href="/print"
            >
              <span class="menu-icon">
                <!--begin::Svg Icon | path: assets/media/icons/duotune/files/fil018.svg-->
                <span class="svg-icon svg-icon-muted svg-icon-1"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M10 4H21C21.6 4 22 4.4 22 5V7H10V4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.4 3.60001L12 6H21C21.6 6 22 6.4 22 7V19C22 19.6 21.6 20 21 20H3C2.4 20 2 19.6 2 19V4C2 3.4 2.4 3 3 3H9.20001C9.70001 3 10.2 3.20001 10.4 3.60001ZM16 11.6L12.7 8.29999C12.3 7.89999 11.7 7.89999 11.3 8.29999L8 11.6H11V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V11.6H16Z"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.3"
                      d="M11 11.6V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V11.6H11Z"
                      fill="currentColor"
                    /></svg
                ></span>
                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">Print</span>
            </a>
          </div>
        </div>
        <!--end::Menu-->
      </div>
      <!--end::Aside Menu-->
    </div>
    <!--end::Aside menu-->
  </div>
  <!--end::Aside-->
</template>

<script>
const token = localStorage.getItem("token");
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export default {
  name: "Aside",
  data() {
    return {
      user: parseJwt(token),
    };
  },
};
</script>

<style>
</style>