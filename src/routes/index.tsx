import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "../pages/signin"
const routerApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default routerApp