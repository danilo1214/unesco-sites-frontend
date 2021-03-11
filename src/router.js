import Router from 'vue-router';
import Home from "./components/Home";
import Site from "./components/Site";



const routes = [
    {
        name: "home",
        path: "/home",
        component: Home
    },
    {
        name: "site",
        path: "/site/:id",
        component: Site
    }
];

export default new Router({routes});
