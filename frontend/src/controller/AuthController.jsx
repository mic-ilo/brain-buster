import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../model/providers/authprovider";
import { PlayerContext } from "../components/PlayerContextProvider";
import UserModel from "../model/providers/UserModel";
//view
import GameHomeLogin from "../view/GameHomeLogin";

export default function AuthController() {
  const [state, dispatch] = useContext(AuthContext);
  const [player, setPlayer] = useContext(PlayerContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const handleChange = (event) => {
    switch (event.target.id) {
      case "username":
        setUserData({ ...userData, username: event.target.value });
        break;

      case "password":
        setUserData({ ...userData, password: event.target.value });
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.password) {
      setEmptyData(true);
      return;
    }

    try {
      const token = await UserModel.login(userData.username, userData.password);
      const username = userData.username;
      setPlayer({ ...player, username: username });
      dispatch({ type: "SAVE_TOKEN", payload: token });

  
      navigate("/dashboard");
    } catch (err) {
      setLoginError("true");
    }
  };

  return (
    <GameHomeLogin
      handleChange={handleChange}
      onSubmit={onSubmit}
      username={userData.username}
      password={userData.password}
      loginError={loginError}
      emptyData={emptyData}
    />
  );
}
