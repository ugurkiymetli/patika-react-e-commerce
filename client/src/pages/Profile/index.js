import { Text, Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
function Profile({ history }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout(() => {
      history.push("/");
    });
  };
  return (
    <div>
      <Text fontSize="24px">Profile</Text>
      <code> {JSON.stringify(user)}</code>
      <br />
      <br />
      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;
