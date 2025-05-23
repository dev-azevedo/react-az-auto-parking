import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import PrivateRoutes from "./privateRoutes";
import Layout from "@/pages/Layout";
import Auth from "@/pages/Auth";
import SignIn from "@/components/Auth/SignIn";
import SignUp  from "@/components/Auth/SignUp";
import Parking from "@/pages/Parking";

const routerApp = () => {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/parking" element={<Parking />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default routerApp;
