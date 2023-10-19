import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../model/providers/authprovider";

export default function AuthGuard(props) {
  const [state, dispatch] = useContext(AuthContext);
  const cachedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cachedToken) {
      navigate("/");
    } else if (state.token !== cachedToken) {
      dispatch({ type: "SAVE_TOKEN", payload: cachedToken });
    }
  }, [cachedToken, state.token, dispatch, navigate]);

  return <>{props.children}</>;
}
