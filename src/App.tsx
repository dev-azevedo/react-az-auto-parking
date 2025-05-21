import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import RouterApp from "./routes";
import { AuthProvider } from "./context/auth.context";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouterApp />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;
