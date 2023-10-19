import { createContext, useReducer } from "react";

const initialState = {
  token: "",
};

const AuthContext = createContext();

const AuthProvider = (props) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "SAVE_TOKEN":
        const saveToken = action.payload;
        localStorage.setItem("token", saveToken);
        return {
          ...state,
          token: saveToken,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
