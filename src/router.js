import Router from 'vue-router';
import Home from "./components/Home";



const routes = [
    {
        name: "home",
        path: "/home",
        component: Home
    }
];

export default new Router({routes});
