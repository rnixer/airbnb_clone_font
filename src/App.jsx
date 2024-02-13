import { ToastContainer, Slide } from "react-toastify";
import Spinner from "./component/Spinner";
import { useAuth } from "./feature/auth/contexts/AuthContext";
import "./index.css";
import Router from "./route/index";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8777";

function App() {
  const { initialLoading } = useAuth();
  if (initialLoading) return <Spinner />;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
        transition={Slide}
      />
      <Router />
    </>
  );
}

export default App;
