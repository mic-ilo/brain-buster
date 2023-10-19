import { useState } from "react";
import RegisterUser from "../view/RegisterUser";
import UserModel from "../model/providers/UserModel";

export default function UserController() {
  const [registerUser, setRegisterUser] = useState({
    _id: "",
    username: "",
    password: "",
    isActive: true,
    highScore: [],
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSuccessful, setisSuccesful] = useState(false);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "username":
        setRegisterUser({ ...registerUser, username: event.target.value });
        break;

      case "password":
        setRegisterUser({ ...registerUser, password: event.target.value });
        break;

      case "confirmPassword": {
        setConfirmPassword(event.target.value);
        break;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkUser = await UserModel.getUser(registerUser.username);

    if (checkUser === null) {

      if (registerUser.password !== confirmPassword) {
        setPasswordError(true);
        return;
      }

      try {
        const newUser = await UserModel.addUser({ ...registerUser });
        setRegisterUser({ ...registerUser, username: "", password: "" });
        setConfirmPassword("");
        setisSuccesful(true);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      setIsRegistered(true);
    }
  };

  return (
    <div>
      <RegisterUser
        username={registerUser.username}
        handleChange={handleChange}
        password={registerUser.password}
        handleSubmit={handleSubmit}
        confirmPassword={confirmPassword}
        passwordError={passwordError}
        isRegistered={isRegistered}
        isSuccessful={isSuccessful}
      />
    </div>
  );
}
