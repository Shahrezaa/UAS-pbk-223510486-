import { createRouter, createWebHistory } from "vue-router";
import Home from "../App.vue";

const routes = [
  {
    path: "/",
    name: "App",
    component: Home,
  },
  // Add other routes here
  {
    path: "/external/:url",
    name: "ExternalRedirect",
    component: {
      beforeRouteEnter(to, from, next) {
        window.location.href = to.params.url;
      },
      render: (h) => h(),
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
