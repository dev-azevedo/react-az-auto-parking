import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Button from "../../components/models/Button";
import BaseAnimate from "../../components/models/BaseAnimate";

export const Home = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <div>
      <BaseAnimate>
        <h1>Home</h1>
        <Button onClick={signOut} className="bg-slate-700">Logout</Button>
      </BaseAnimate>
    </div>
  );
};