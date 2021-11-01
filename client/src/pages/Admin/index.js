import Styles from "./styles.css";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import Home from "./Home";
import Products from "./Products";
import Orders from "./Orders";

function Admin() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to={url}>
              <Button variant="ghost">Home</Button>
            </Link>
          </li>
          <li>
            <Link to={`${url}/orders`}>
              <Button variant="ghost">Orders</Button>
            </Link>
          </li>
          <li>
            <Link to={`${url}/products`}>
              {" "}
              <Button variant="ghost">Products</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <Box mt="10">
        <Switch>
          <Route exact path={path} component={Home} />
          <Route path={`${path}/orders`} component={Orders} />
          <Route path={`${path}/products`} component={Products} />
        </Switch>
      </Box>
    </div>
  );
}

export default Admin;
