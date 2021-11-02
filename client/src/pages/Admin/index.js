import Styles from "./styles.css";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import Home from "./Home";
import Products from "./Products";

import ProductDetail from "./ProductDetail";
import Orders from "./Orders";
import NewProduct from "./Products/new";

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
          <Route exact path={`${path}/products`} component={Products} />
          <Route exact path={`${path}/products/new`} component={NewProduct} />
          <Route
            path={`${path}/products/:product_id`}
            component={ProductDetail}
          />
        </Switch>
      </Box>
    </div>
  );
}

export default Admin;
