import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

type ProtectedRouteProps = {
    children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return children;
}
export default ProtectedRoute;