import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import RouterApp from "./routes";
import { AuthProvider } from "./context/auth";


function App() {
  return (
    <AuthProvider>
        <RouterApp />
        <ToastContainer />
    </AuthProvider>
  );
}

export default App;
