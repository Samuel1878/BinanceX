import React, { useEffect } from "react";
import $ from "jquery";
const SideNav = ()=>{
$(document).ready(function(){
    $(".navContainer ul li:first-child").css("border-left","5px solid var(--main-color)").addClass("hovered")
    $(".navContainer ul li").on("click", function (){
        $(this).siblings("li").css("border","none").removeClass("hovered");
        $(this).css("border-left","5px solid var(--main-color)").addClass("hovered");
    })
       
});
   
    useEffect(()=>{
       
    },[])

    return (<>
    <nav className="navContainer">
        <ul>
            <li>
                <a href="/dashboard"> 

                    <span className="icon">
                     <i className="fa-solid fa-house-user"></i>
                    </span>
                    <span className="title-nav">
                        Dashboard
                    </span>
                </a>
            </li>
            <li>
                <a href="/dashboard/security">
                    <span className="icon">
                        <i className="fa-solid fa-shield-halved"></i>
                    </span>
                    <span className="title-nav">
                        Security
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span className="icon">
                        <i className="fa-solid fa-id-card"></i>
                    </span>
                    <span className="title-nav">
                        Identification
                    </span >
                </a>
            </li>
            <li>
                <a href="#">
                    <span className="icon">
                        <i className="fa-solid fa-money-check-dollar"></i> 
                    </span>
                    <span className="title-nav">
                        Payment
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span className="icon">
                        <i className="fa-solid fa-gear"></i>
                    </span>
                    <span className="title-nav">Settings</span>
                </a>
            </li>
        </ul>
    <div id="toggleBtn">

    </div>
</nav></>)
}
export default SideNav;