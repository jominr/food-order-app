import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

// 如果用户没登录，通过路由访问/user-profile, 我们会跳转，这样是不理想的，
// 因此我们为特定路由增加了保护
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace/>;
}

export default ProtectedRoute;