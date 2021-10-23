import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>

        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <Link to="/signup">
          <Button colorScheme="teal">Register</Button>
        </Link>
        <Link to="/signin">
          <Button colorScheme="teal" variant="outline">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
