import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/Routes"

function App() {

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  )
}

export default App
