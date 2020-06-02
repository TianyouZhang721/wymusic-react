import Home from '../pages/Home/Home'
import Recommend from '../pages/Home/Recommend'
import Hot from '../pages/Home/Hot'
import Search from '../pages/Home/Search'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Play from '../pages/Play/Play'
const routes = [
    {
        path: "/home",
        component: Home,
        children: [
            {
                path: "/home/recommend",
                component: Recommend
            },
            {
                path: "/home/hot",
                component: Hot,
                auth: true
            },
            {
                path: "/home/search",
                component: Search
            },
            {
                from: "/home",
                to: "/home/recommend"
            }
        ]
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/play",
        component: Play
    },
    {
        from: "/",
        to: "/home"
    }
]
export default routes