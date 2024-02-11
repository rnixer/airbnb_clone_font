import "./index.css";
import Router from "./route/index";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8777";

function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
