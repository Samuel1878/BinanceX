import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import {NavBar} from "./navBar";
import Home from "./components/home";
import Market from "./components/market";
import Trade from "./components/trade";
import Derivatives from "./components/derivatives";
import DeFi from "./components/defi";
import Account from "./components/accounts/accounts";
import ShareLayOut from "./components/layout/shareLayOut"
import { ShareNav } from "./components/nav";
import { CssBaseline} from "@mui/material";
import Login from "./components/accounts/login";
import {Register} from "./components/accounts/register";
import ProtectedLayout from "./components/layout/protectedLayout";
import UserSecurity from "./components/admin/userSecurity";
import DashBoard from "./components/admin/dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

 

function App() {

return (<>
<CssBaseline />
 <Routes>
  <Route path="/" element={<ShareLayOut/>}>
    <Route index element={<Home/>}/>
    <Route path="/market" element={<Market/>}/>
    <Route path="/trade" element={<Trade/>} />
    <Route path="/derivatives" element={<Derivatives/>} />
    <Route path="/defi" element={<DeFi/>} />
    <Route path="dashBoard" element={<ProtectedLayout/>}>
      <Route index element={<DashBoard/>}/>
      <Route path="security" element={<UserSecurity/>}/>
    </Route>
  </Route>
  <Route path="account" element={<ShareNav/>}>
        <Route index element={<Account/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
  </Route>
  <Route path="*" element={<h1>Error: page couldn't found</h1>}/>
 </Routes>
 </>)
}

export default App;
