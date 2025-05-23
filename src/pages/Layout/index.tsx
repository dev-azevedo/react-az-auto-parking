import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu";

const Layout = () => {
    return (
        <main>
            <Menu />
            <Outlet />
        </main>);
};

export default Layout;