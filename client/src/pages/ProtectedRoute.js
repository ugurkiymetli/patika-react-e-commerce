import { Route, Redirect } from "react-router";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute({ component: Component, admin, ...rest }) {
  const { isLoggedIn, user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (admin && user?.role !== "admin") {
          return <Redirect to={{ pathname: "/" }} />;
        }

        if (isLoggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );
}

export default ProtectedRoute;
