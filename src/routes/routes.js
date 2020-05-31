import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Play from '../pages/Play/Play'
const routes = [
    {
        path: "/home",
        component: Home
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