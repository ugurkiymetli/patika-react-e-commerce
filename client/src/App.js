import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import SigIn from "./pages/Auth/Sigin";
import SignUp from "./pages/Auth/Signup";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" component={SigIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
function Home() {
  return <h2>Home</h2>;
}
export default App;
