import { useState } from "react";
import { createContext } from "react";

export const PlayerContext = createContext();

export default function PlayerContextProvider(props) {
  const [player, setPlayer] = useState({
    username: "",
    url: "",
    category: "",
  });
  return (
    <PlayerContext.Provider value={[player, setPlayer]}>
      {props.children}
    </PlayerContext.Provider>
  );
}
