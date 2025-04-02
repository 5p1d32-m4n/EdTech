import { Navigate } from "react-router-dom";

function PrivateRoute({ children }){
    const token = localStorage.getItem('token'); // Checks for JWT.
    return token ? children : <Navigate to="/login"/>
}

export default PrivateRoute;