import "./style.css";
import { useState,useEffect,useRef,memo } from "react";
const NumberInput = (pros) => {
   const REGEX_NO = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
   const {userNumber, setUserNumber,validNumber, setValidNumber} = pros.value;
    const [FocusOnCL, SetFOC] = useState("");
    const [FocusOnCLi, SetFOCi] = useState("");
    const [areaCode,setAreaCode] = useState("");
    const [bodyNo,setBodyNo] = useState("");
    const [FocusOnVC,SetFocusOnVC] = useState("");
    const noRef=useRef();
    const areaRef=useRef();
    function FocusHandler (e) {
        if(e.target.id==="areaCode") {
            SetFOCi("FOC");
            return
        } else if(e.target.id==="NumberInput"){
            SetFOC("FOC");return
        }else {
            SetFocusOnVC("FOC")
        }
    }
    function CloseHandler (e) {
        if (e.target.value==="") {
            if(e.target.id==="areaCode") {
                SetFOCi("CLOSE");
                return;
            } else if(e.target.id==="NumberInput") {
                SetFOC("CLOSE");
                return;
            } else {
                SetFocusOnVC("CLOSE")
            }
        }
    }
    function ChangeHandler(e) {
        const returnNumber = e.target
        if(returnNumber.id==="areaCode") {
            setAreaCode(returnNumber.value);
            console.log(areaCode);
        } else {
            setBodyNo(returnNumber.value);
            console.log(bodyNo);
            };
    }
    function clickHandler(e) {
        e.preventDefault();
        let Number = areaCode + bodyNo
        setValidNumber(REGEX_NO.test(Number));
        
    }

    useEffect(()=>{
        (validNumber)?setUserNumber(areaCode + bodyNo):console.log("incorrect number:", userNumber);
    },[validNumber])
    return <>
    <div className="NumberInput">
        <div className="AreaCode">
            <label id={FocusOnCLi}>Area code</label>
            <input 
                onFocus={FocusHandler} 
                onBlur={CloseHandler} 
                onChange={ChangeHandler}
                type="text" maxLength={5} minLength={1}
                id="areaCode"
                value={areaCode}
                autoComplete="off"
                required
                ref={areaRef}></input>
        </div>
        <div className="Numm">
            <label id={FocusOnCL}>Phone Number</label>
            <input onFocus=
                {FocusHandler} 
                onBlur={CloseHandler} 
                onChange={ChangeHandler}
                type="number" 
                id="NumberInput" 
                value={bodyNo}
                required
                autoComplete="off"
                ref={noRef}></input>
        </div>
    </div>
    <div className="NumberVerify">
        <div className="verifyCode">
            <label id={FocusOnVC}>2-FA code</label>
            <input 
                type="number"
                onFocus={FocusHandler}
                onBlur={CloseHandler}
                ></input>
        </div>
        <button id="no-ver-send" onClick={clickHandler}>Send</button>
    </div>
    </>  
}
export default NumberInput