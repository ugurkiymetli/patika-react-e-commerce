import { Route, Redirect } from "react-router";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );
}

export default ProtectedRoute;
