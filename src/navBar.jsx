import "./App.css";
import { useEffect, useRef,useState,useContext } from "react";
import UserContext from "./components/Context";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {useNavigate } from "react-router-dom";


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage:  `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
         ,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
          ,
        },
      },
      '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
      },
    }));
export function NavBar() {
    const inputTag = useRef(null);
    const [mode,setMode] = useState("fa-solid fa-sun");
    const [isOpened,setOpen] = useState(false);
    const [showUp,setShowUp] = useState("");
    const [checked, setChecked] = useState(true);
    const r = document.querySelector(":root");
    const navigate = useNavigate();
 

    const darkMode = () => {
        setMode("fa-solid fa-sun");
        localStorage.setItem("mode","dark");
        localStorage.setItem("theme","dark");
            r.style.setProperty( "--bg-color","rgb(19,20,24)");
            r.style.setProperty("--main-color","rgb(251,205,41)");
            r.style.setProperty("--second","rgb(64,42,10)");
            r.style.setProperty("--text","#fff");
            r.style.setProperty("--low", "rgb(55, 60, 69)");
            r.style.setProperty("--title", "rgb(226,229,233)");
            r.style.setProperty("--low1","rgb(60, 70, 70)");
            r.style.setProperty("--bg-color1","rgb(11,13,14)");
            r.style.setProperty("--box-shadow", "0px 0px 5px 5px rgba(31, 28, 28, 0.5)");
            r.style.setProperty("--background","rgb(19,20,24)");
            r.style.setProperty("--black-bg"," rgb(10,12,11)");
            r.style.setProperty("--btn"," rgb(50,65,69)");
            r.style.setProperty("--hover"," rgb(32,37,42)");
            r.style.setProperty("--textLow","rgb(200, 204, 210)");
            r.style.setProperty("--textLow1","rgb(113, 123, 139)");
            r.style.setProperty("--box-shadow1", "2px 10px 10px rgba(60, 65, 65, 0.1)");
            setChecked(true); 
            r.style.setProperty("--bear","rgb(195,33,61)");
           
             
           
    }
    const lightMode = () => {
        localStorage.setItem("mode","light");
        localStorage.setItem("theme","light")
        setMode("fa-solid fa-moon");
        r.style.setProperty("--bg-color", "rgb(253, 253, 253)");
        r.style.setProperty("--main-color","rgb(251,205,41)");
        r.style.setProperty("--second","rgb(254, 244, 207)");
        r.style.setProperty("--text", "#040404");
        r.style.setProperty("--low","rgb(228, 231, 235)");
        r.style.setProperty("--title","rgb(11,13,15)");
        r.style.setProperty("--low1","rgb(187, 187, 187)");
        r.style.setProperty("--bg-color1" ,"rgb(245, 245, 245)");
        r.style.setProperty(" --box-shadow", "0px 0px 5px 5px rgba(223, 219, 219, 0.979)")
        r.style.setProperty("--background" ,"rgb(255,255,255)")
        r.style.setProperty("--black-bg","rgb(248,248,248)");
        r.style.setProperty("--btn"," rgb(228,231,235)");
        r.style.setProperty("--hover"," rgb(242,242,242)");
        r.style.setProperty("--textLow"," rgb(95,105,121)");
        r.style.setProperty("--textLow1","rgb(93, 103, 118)");
        r.style.setProperty("--box-shadow1", "2px 10px 10px rgba(73, 75, 75, 0.3)");
        r.style.setProperty("--bear","rgb(195,33,61)");
        setChecked(false);
        
    }

    const modeHandler = (event) => {
        console.log(checked);
        console.log(event.target);
        setChecked(event.target.checked);
       checked? lightMode():darkMode();
      };
  
    function showPopup (e){
       const icon = e.target; 

    const open = () => {
        icon.classList.replace("fa-bars","fa-xmark");
        setOpen(true);
        setShowUp("showUp");
    }
    const close = () => {
            icon.classList.replace("fa-xmark","fa-bars");
            setOpen(false);
            setShowUp("closed");
        }
    isOpened? close() :open();

        window.onclick = function fNc (para) {
            if (para.target.matches("#PopUpbtn" || "#themeBtn")){
               return
            }
            close();
        }
    }
   
    const changeMode = (e) => {
        
        if (e.target.id==="light") {
            e.target.id="dark"
            darkMode();
            return
        }
        e.target.id="light"; 
        lightMode();
    }
 
 useEffect(()=>{
    
    window.onload = function() {
        const Mode = localStorage.getItem("mode");
        const Theme = localStorage.getItem("theme");
        console.log(Mode);
        if (Mode==="light" && Theme==="light") {
            lightMode()
        } else {darkMode()}
    }
 },[mode,checked])

    return (<UserContext.Provider value={{mode,setMode}}>
    <div className="Container">
        <div className="logoContainer">
            <a href="/">
            <i className="fa-brands fa-joomla fa-flip-both"></i>
            <h3>BINANCEX</h3>
            </a>
        </div>
        <ul className="navMenu">
                <li><a href="/market">Market</a></li>
                <li><a href="/trade">Trade</a></li>
                <li><a href="/derivatives">Derivatives</a></li>
                <li><a href="/defi">DeFi</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
        </ul>
        <div className="rightMenu">
            <div className="userNavIcon">
                <button><i class="fa-sharp fa-solid fa-circle-dollar-to-slot"></i>Deposit</button>
                <i onClick={()=>navigate("/dashboard")}className="fa-solid fa-circle-user"></i>
            </div>
            <button className="loginBtn" onClick={()=>navigate("/account/login")}>Login</button>
            <button className="btn" onClick={()=>{
                navigate("/account")}}><i class="fa-solid fa-gift"></i>Register</button>
            <div className="mode">
                <i className={mode} onClick={changeMode} ></i>
            </div>
        </div>
        <div className="popUpMenu" onClick={showPopup}>
            <i id="PopUpbtn" className="fa-sharp fa-solid fa-bars">
            </i>
        </div>
    </div>
    <div className="popUpCon" id={showUp}>
            <ul>
                <li>
                    <i class="fa-solid fa-house"></i>
                    <a href="/">Home</a>
                </li>
                <li>
                    <i class="fa-solid fa-coins"></i>
                    <a href="/market">Market</a>
                </li>
                <li>
                <i class="fa-solid fa-money-bill-transfer"></i>
                    <a href="/trade">Trade</a>
                </li>
                <li>
                    <i class="fa-solid fa-chart-simple"></i>
                    <a href="derivatives">Derivatives</a>
                </li>
                <li>
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                    <a href="defi">DeFi</a>
                </li>
                <li>
                    <i class="fa-solid fa-chart-pie"></i>
                    <a href="portfolio">Portfolio</a>
                </li>
                <li>
                     <i class="fa-brands fa-joomla"></i>
                     <p>theme</p>
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 1 }} id="themeBtn" checked={checked} onChange={modeHandler}/>}
                        label=""
                        
                    />
                </li>
            </ul>
    
        </div>
    
    </UserContext.Provider>)


 }
 

