// import Button from './components/models/button'
import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import {  Navigate, Outlet } from "react-router-dom";

export default function SignIn() {
  const { signed } = useContext(AuthContext);

  if(signed) {
    return <Navigate to="/" />
  }
  
  return (
    <>
      <div
        className="bg-dark
        p-1  lg:px-56 
        w-full h-screen 
        flex xl:justify-between items-center
        flex-col xl:flex-row
      "
      >
        <div></div>
        <Outlet />
      </div>
    </>
  );
}
