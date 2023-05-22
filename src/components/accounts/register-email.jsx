import React from "react";
import { useState,useEffect,useRef,memo } from "react";
import axios from "axios";

const EmailInput = (pros)=>{  
    const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {emailRef,userEmail, setUserEmail, validName,setvalidName} = pros.value;
    const [FocusOnCL, SetFOC] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [FocusOnVC, SetFocusOnVC] = useState("");
    const [sent, setSent] = useState(false);
    const [count,setCount] = useState(60);
    const [_2FA, set2FA] = useState("");
    const [input_2FA, setInput2FA] = useState("");
    function FocusHandler (e) {
        if (e.target.id==="EmailInput"){
        SetFOC("FOC");
    } else {SetFocusOnVC("FOC")}
    };
    function CloseHandler (e) {
        if(e.target.value==="") {(e.target.id==="EmailInput")?SetFOC("CLOSE"): SetFocusOnVC("CLOSE")} else {
            return
        }
    };
    function ChangeHandler(e) {
      const Value =  e.target.value; 
      setValidEmail(REGEX_EMAIL.test(Value));
      setUserEmail(Value);
    };
    function postSignUpDetails() {
        axios.post("http://localhost:3000/api/register/2fa",{
               email:userEmail},{
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
            set2FA(response.data.code);
            console.log(_2FA);})
        .catch((err)=>console.log("Email err", err))
    };
    function SendVerification (e) {
        if(validEmail) {
            postSignUpDetails();
            setCount(60);
            console.log(userEmail);
            setSent(true);
            setTimeout(()=>{
                setSent(false); 
                clearInterval(intervalID);
            },61000);
            const intervalID = setInterval(() => {
                setCount((prev)=>prev-1)
            }, 1000)
        } else {
            console.log("err:message")
        }  
    };
    useEffect(()=>{
        emailRef.current.focus();
        setvalidName(false);


    },[]);
    useEffect(()=>{
    if (_2FA===input_2FA){
            setvalidName(true);
            return
    }
    console.log(input_2FA, _2FA);
    },[input_2FA,_2FA]);


    return <>
    <div className="EmailInPut">
        <label id={FocusOnCL}>Personal Email</label>
        <input 
            onFocus={FocusHandler} 
            onBlur={CloseHandler} 
            onChange={ChangeHandler}
            id="EmailInput" 
            type="email"
            required
            autoComplete="off"
            ref={emailRef}
            ></input>
    </div>
    <div className="emailVerify">
        <div className="verifyCode">
            <label id={FocusOnVC}>2-FA code</label>
            <input 
                type="text"
                onFocus={FocusHandler}
                onBlur={CloseHandler}
                onChange={e=>setInput2FA(e.target.value)}
                value={input_2FA}
                ></input>
                {(_2FA===input_2FA)?<span id="Ver"><i className="fa-regular fa-circle-check"></i></span>:<span id="NotV"><i className="fa-solid fa-triangle-exclamation"></i></span>}
        </div>
        <div className="sendBTN">
        {(sent)?<div id="Counter"><p>Sent! Check your mailbox</p>Time:{count}s</div>:<button id="sendVerifyCode" onClick={SendVerification}>Send</button>}
        </div>  
    </div>
    </>
}
export default memo (EmailInput)