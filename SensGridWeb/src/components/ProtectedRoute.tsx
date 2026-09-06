import type { JSX } from "react/jsx-runtime";
import type { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type ProtectedRouteProps = {
    children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}
export default ProtectedRoute;