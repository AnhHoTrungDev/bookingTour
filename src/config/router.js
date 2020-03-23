export default [
  {
    title: "Login Page | Booking",
    component: "./bodys/login-logout/login",
    path: "/login",
    isProtected: false
  },
  {
    title: "Home Page |Booking",
    component: "./bodys/home/home",
    path: "/home",
    isProtected: false
  },
  {
    title: "Home Page |Booking",
    component: "./bodys/home/home",
    path: "/",
    isProtected: false
  },
  {
    title: "Home Page |Booking",
    component: "./bodys/home/home",
    path: "/",
    isProtected: false
  },
  // {
  //   title: "Tour |Booking",
  //   component: "./bodys/listTour/bgListTour",
  //   path: "/tour",
  //   isProtected: false
  // },
  {
    title: "Functions",
    component: "./headers/payment",
    path: "/payment",
    isProtected: false
  },
  {
    title: "Functions",
    component: "./bodys/home/detail/detail",
    path: "/detail",
    isProtected: false
  },
  {
    title: "Not Found",
    component: "./bodys/home/notFound/404NotFound",
    path: "*",
    isProtected: false
  }
];
