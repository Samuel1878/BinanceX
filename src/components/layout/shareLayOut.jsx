import { Outlet } from "react-router-dom";
import {NavBar} from "../../navBar"
function ShareLayOut () {
     
    return <>
    <NavBar/>
    <Outlet/>
    </>
}
export default ShareLayOut;