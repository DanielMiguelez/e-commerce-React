import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext/UserState";

const AuthRoutes = () => {
    const { token } = useContext(UserContext);

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
