import { Route, Routes } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import VerifyUser from "../pages/authentication/VerifyUser";
import PrivateRoute from "./PrivateRoute";
import NotesDashboard from "../pages/note-dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-user/:token" element={<VerifyUser />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<NotesDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
