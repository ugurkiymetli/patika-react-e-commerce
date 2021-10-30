import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { BsShop } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
function Navbar() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Button leftIcon={<BsShop />} color="#000" variant="link">
            <Link to="/">E-Commerce React</Link>
          </Button>
        </div>

        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <Button colorScheme="teal">Register</Button>
            </Link>
            <Link to="/signin">
              <Button colorScheme="teal" variant="outline">
                Login
              </Button>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/profile">
              <Button colorScheme="teal">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
