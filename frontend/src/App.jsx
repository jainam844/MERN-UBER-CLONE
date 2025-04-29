import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CaptainLogin from "./pages/CaptainLogin";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Start from "./pages/Start";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import Logout from "./pages/Logout";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
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
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  )
}