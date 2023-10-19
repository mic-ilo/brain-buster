import { useState, useContext } from "react";
import UserModel from "../model/providers/UserModel";
import { PlayerContext } from "../components/PlayerContextProvider";
import { useNavigate } from "react-router-dom";

//view
import UserProfile from "../view/UserProfile";

export default function UserProfileController() {
  const navigate = useNavigate();
  const [player, setPlayer] = useContext(PlayerContext);
  const [updateUser, setUpdateUser] = useState({
    username: "",
    password: "",
  });
  const [usernameChangeSuccess, setUsernameChangeSuccess] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);

  const deleteAccountAction = async () => {
    try {
      const user = await UserModel.deleteUser(true, player.username);
      const token = localStorage.getItem("token");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error to delete account", error);
    }
  };

  const updateUsernameAction = async () => {

    const checkUser = await UserModel.getUser(updateUser.username);

    if (checkUser) {
      setUsernameTaken(true);
      return;
    }
    try {
      const user = await UserModel.updateUser(
        updateUser.username,
        null,
        player.username
      );
      setUsernameChangeSuccess(true);
      setPlayer({ username: updateUser });
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  };

  const updatePasswordAction = async () => {
    const currentPlayer = await player.username;
    try {
      const user = await UserModel.updateUser(
        null,
        updateUser.password,
        currentPlayer
      );
      setPasswordChangeSuccess(true);
    } catch (error) {
      console.error("Error updating user password");
    }
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case "username":
        setUpdateUser({ ...updateUser, username: event.target.value });
        break;
      case "password":
        setUpdateUser({ ...updateUser, password: event.target.value });
        break;
    }
  };

  return (
    <>
      <UserProfile
        deleteAccountAction={deleteAccountAction}
        updateUsername={updateUsernameAction}
        updatePassword={updatePasswordAction}
        handleChange={handleChange}
        usernameValue={updateUser.username}
        passwordValue={updateUser.password}
        usernameChangeSuccess={usernameChangeSuccess}
        passwordChangeSuccess={passwordChangeSuccess}
        usernameTaken={usernameTaken}
      />
    </>
  );
}
