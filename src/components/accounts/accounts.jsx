import "./style.css";
import trading from "../../assets/account.png"
import { useNavigate } from "react-router-dom";

 function Accounts() {
   const navi = useNavigate();

    return <>
    <div className="Xontainer">
      <div className="accleft">
         <div>
            <h1>Welcome to Binancex</h1>
            <button id="Mbtn" onClick={()=>navi("/account/register")}><i className="fa-solid fa-user"/><span>Signup with email or phone</span></button>
               <br></br><hr></hr>
            <button><i className="fa-brands fa-google"></i><span>Continue with Google</span></button>
            <button><i className="fa-brands fa-apple"></i><span>Continue with Apple</span></button>
            <div><span>Already registered?</span><a href="/account/login">Login</a></div>
            <p>Cannot Create account? <a href="#">Contact to developer</a></p>
         </div>
      </div>
      <div className="accright">
         <img src={trading}></img>
         <div>
            <h3>Buy Crypto in Minutes</h3>
            <p>Enjoy the world’s largest cryptocurrency exchange at your fingertips.</p>
         </div>
      </div>

    </div>
    </>
 }
 export default Accounts;