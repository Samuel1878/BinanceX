import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../API/AuthProvider";
import SideNav from "../admin/SideNav";
import Footer from "../../footer.jsx";

const ProtectedLayout = ()=>{
    const User = localStorage.getItem("user");
    console.log(User)
    const {auth} = useAuth();
    console.log(auth)
    /*if(User==="" || !User) {
        return<Navigate to="/"></Navigate>
    }**/
    return (<>
    <div className="mother-dashboard">
        <SideNav/>
        <Outlet/>
        
        
    </div>
    <div id="footerDashboard">
        <Footer/>
    </div></>)
}
export default ProtectedLayout;