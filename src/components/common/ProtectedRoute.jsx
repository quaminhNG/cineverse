import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

/**
 * ProtectedRoute - Bảo vệ các route cần đăng nhập
 * Hỗ trợ RBAC (Role-Based Access Control)
 * @param {string[]} allowedRoles - Danh sách role được phép truy cập (vd: ["admin", "vip"])
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) return <LoadingScreen />;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
