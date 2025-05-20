import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "../pages/SignIn";
import { Home } from "../pages/Home";
import { PrivateRoutes } from "./privateRoutes";

const routerApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default routerApp;
