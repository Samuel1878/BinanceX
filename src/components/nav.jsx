import { Outlet } from "react-router-dom";
import "./accounts/style.css";
import UserContext from "./Context";
import { useState, useContext } from "react";


const Nav = () =>{
    const obj = useContext(UserContext);
    
    const [mode,setMode] = useState("fa-solid fa-sun")
    function changeMode (){
        setMode("fa-solid fa-moon")
        console.log(obj);
        
    }


    return<div className="NavBarContainer">
        <div className="LoGoContainer">
            <a href="/">
                <i className="fa-brands fa-joomla fa-flip-both"></i>
                <h3>BINANCEX</h3>
            </a>
        </div>
        <div className="NavRightCon">
            <i className="fa-solid fa-globe"></i>
            <div className="Mode">
                <i className={mode} onClick={changeMode} ></i>
            </div>
        </div>
        <div className="NavPopUp">
            <i className="fa-sharp fa-solid fa-bars"></i>
        </div>
    </div>
    
}
export const ShareNav = () => {
    return <>
    <Nav/>
    <Outlet/>
    </>
}