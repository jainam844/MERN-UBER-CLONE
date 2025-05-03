import { Route, Routes } from "react-router-dom";
import Home from "./pages/rider/Home";
import UserLogin from "./pages/rider/UserLogin";
import UserSignup from "./pages/rider/UserSignup";
import UserProtectWrapper from "./pages/rider/UserProtectWrapper";
import Logout from "./pages/rider/Logout";
import Riding from "./pages/rider/Riding";

import CaptainLogin from "./pages/captain/CaptainLogin";
import CaptainSignup from "./pages/captain/CaptainSignup";
import CaptainHome from "./pages/captain/CaptainHome";
import CaptainProtectWrapper from "./pages/captain/CaptainProtectWrapper";
import CaptainRiding from "./pages/captain/CaptainRiding";
import CaptainLogout from "./pages/captain/CaptainLogout";

import Start from "./pages/Start";

import 'remixicon/fonts/remixicon.css'
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path="/user/logout" element={
          <UserProtectWrapper>
            <Logout />
          </UserProtectWrapper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>

        } />
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  )
}