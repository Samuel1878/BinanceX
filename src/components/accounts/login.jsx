import "./style.css"
import login from "../../assets/login.png";
import { useState,useContext, useEffect } from "react";
import AuthContext from "../../API/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LOGINAPI_URL = "http://localhost:3000/api/login"
const Login = () =>{
    const [nameId, setNameId] = useState("");
    const [pwdId, setPwdId] = useState("");
    const [userName, setUserName] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const {auth,setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    function FocusHandler (e) {
        const Event = e.target
        if(Event.id ==="userName"){
            setNameId("FOC");
            return
        }else{
            setPwdId("FOC");
        }
       
    }
    function FocusOut (e) {
       if (e.target.value==="") {
            if (e.target.id ==="userName"){
                setNameId("CLOSE");
                return
            }else {
                setPwdId("CLOSE");
            }
        }    
    }
   const SubmitHandler = async(e) =>{
        try{
            const response = await axios.post(
                LOGINAPI_URL,
                {userName,userPwd},
                {headers:{
                    "Content-Type":"application/json"}
                }
            );e.preventDefault();
            switch(response.data.code){
                case 400 :
                    console.log(response.data.message);
                    break;
                case 401 :
                    console.log(response.data.message);
                    break;
                case 200 :
                    setAuth(response.data);  
                    alert(response.data.message);
                    console.log(auth);
                    localStorage.setItem("user", response.data.data);
                    navigate("/dashboard")
            };

        }catch(err){
            console.log(err)
        }
        
    }

    useEffect(()=>{

    },[])
 
    return <div className="Body">
    <div className="container">
        <div className="LoginLeft">
            <form action="#" onSubmit={SubmitHandler}>
                <h1>Login</h1>
                <div className="inputBox">
                    <label id={nameId}>Email / Number</label>
                    <input 
                        id="userName" 
                        onFocus={FocusHandler} 
                        onBlur={FocusOut} 
                        type="email/number" 
                        value={userName} 
                        onChange={(e)=>setUserName(e.target.value)}></input>
                    <i class="fa-solid fa-user-tie"></i>
                </div>
                <div className="inputBox">
                    <label id={pwdId}>Password</label>
                    <input 
                        id="passWord" 
                        onFocus={FocusHandler} 
                        onBlur={FocusOut} 
                        type="password" 
                        value={userPwd}
                        onChange={(e)=>setUserPwd(e.target.value)}></input>
                    <i class="fa-solid fa-lock"></i>
                </div>
                <div className="remember-forgot">
                    <div>
                        <input id="checkBox" type="checkbox"></input>
                        <label for="#checkBox">Remember me</label>  
                    </div>
                    <a>Forgot password?</a>
                </div>
                <div className="Submit">
                    <button id="BUTTON" type="submit">Login</button>
                </div>
                <div className="Register">
                    <p>Don't have account yet?<a href="/account">Register Now</a></p>
                </div>
            </form>

        </div>
        <div className="LoginRight">
            <img src={login}></img>
        </div>
    </div>
    </div>
}

export default Login;