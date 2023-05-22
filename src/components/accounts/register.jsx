import "./style.css";
import { useEffect, useRef, useState,useContext, createRef } from "react";
import EmailInput from "./register-email";
import NumberInput from "./register-no";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const APIREGISTER_URL = "http://localhost:3000/api/register"

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


export const Register = () => {
    const emailRef = useRef();
    const [FocusOnCL, SetFOC] = useState("");
    const [active, setActive] = useState("");
    const [Active, SetActive] = useState("");
    const [act, SetAct] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [validNumber, setValidNumber] = useState(false);
    const [psValue, setPsValue] = useState("");
    const [psConfirmValue,setPsConfirmValue] = useState("");
    const [psComFocus,setPsComFocus] = useState("");
    const [validName, setvalidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [focusPwd,setFocusPwd] = useState(false);
    const [matchPwd, setMatchPwd] = useState(false);
    const [success, setSuccess] = useState(false);
    const errRef = useRef();
    const navigate = useNavigate();
  
    function FocusHandler (e) {
        if (e.target.id==="userPassword"){
            SetFOC("FOC");
            setFocusPwd(true);
            return
        } setPsComFocus("FOC")
    }
    function psBlurHandler (e) {
        if(psValue===""){
            if (e.target.id==="userPassword"){
                SetFOC("CLOSE");
                setFocusPwd(false);
                return
            } 
        }
        if(psConfirmValue==="") {
                setPsComFocus("CLOSE")
        }  
    };
    function EmailHandler() {   
        setActive("active");
        SetActive("NoActive");
        SetAct(true)
    };
    function NumberHandler () {
        SetActive("active");
        setActive("NoActive");
        SetAct(false);
    };

    function PostUserData() {
        axios.post(APIREGISTER_URL, {
                email:userEmail,
                number:userNumber,
                password:psValue
            },{
            headers:{
                "Content-Type":"application/json"
            }
            })
    };
    function SubmitHandler(e){
        e.preventDefault();
        if (validName && validPwd && matchPwd) {
            PostUserData();
            setSuccess(true);
            if(window.confirm("Account successfully created:Click Okay to go to login page!")){
                navigate("/account/login");
            }else{
                navigate("/");
            }

        }else{
            console.log("Not verificated")

        }
    };

    useEffect(()=>{
        setValidPwd(PWD_REGEX.test(psValue));
        setMatchPwd(psValue===psConfirmValue);
    },[psValue,psConfirmValue])
    return <div className="RegiCon">
        <div className="Mother">
            <h1>Create Personal Account</h1>
            <div>
               <button id={active} onClick={EmailHandler}>Email</button>
               <button id={Active} onClick={NumberHandler}>Phone Number</button>
            </div>
            <form onSubmit={SubmitHandler}>
              {(act)?<EmailInput value={{emailRef,userEmail, setUserEmail,validName,setvalidName}}/>:<NumberInput value={{userNumber, setUserNumber,validNumber, setValidNumber}}/>}
                <div className="PsInput" >
                    <label id={FocusOnCL}>Password</label>
                    <input 
                        onFocus={FocusHandler} 
                        onBlur={psBlurHandler}
                        onChange={(e)=>setPsValue(e.target.value)}
                        type="password" 
                        id="userPassword" 
                        value={psValue}
                        required
                        ></input>
                    <i className="fa-solid fa-lock"></i>
                    <p 
                        id="pwdNote"
                        className={(focusPwd && !validPwd)?"BlockCl":"NoneCl"}>
                        &#10071; 8 to 24 characters.
                        Must include uppercase and lowercase letters, a
                        number and a special character.
                        Allowed special characters:{" "}
                        <span aria-label="exclamation mark">
                        !
                        </span>{" "}
                        <span aria-label="at symbol">@</span>{" "}
                        <span aria-label="hashtag">#</span>{" "}
                        <span aria-label="dollar sign">$</span>{" "}
                        <span aria-label="percent">%</span>
                    </p>
                </div>
                <div className="PsConfirm">
                    <label id={psComFocus}>Confirm password</label>
                    <input 
                            onFocus={FocusHandler} 
                            onBlur={psBlurHandler}
                            onChange={(e)=>setPsConfirmValue(e.target.value)}
                            type="password" 
                            id="userPasswordConfirm" 
                            value={psConfirmValue}
                            required
                            minLength={8}
                            maxLength={24}
                            ></input>
                </div>
                <div className="CbInput">
                    <input id="checkBox" type="checkbox"></input>
                    <label>By creating an account agree to Binancex’s Terms of Service and Privacy Policy</label>
                </div>
                <div>
                    <button id="BUTTON"type="submit">Create Account</button>
                </div>
                <div>
                    <p>Already registered? Click here to <a href="/account/login"> login</a></p>
                </div>
                <div>
                    <p2>&#169; 2017-2023 Binancex.com. All rights reserved</p2>
                </div>


            </form>
        </div>
    </div>
}



