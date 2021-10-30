import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SigIn from "./pages/Auth/Sigin";
import SignUp from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Switch>
            <Route path="/" exact component={Products} />
            <Route
              path="/product/:product_id"
              exact
              component={ProductDetail}
            />
            <Route path="/signin" component={SigIn} />
            <Route path="/signup" component={SignUp} />
            <ProtectedRoute path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
