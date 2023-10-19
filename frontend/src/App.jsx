import PlayerContextProvider from "./components/PlayerContextProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./model/providers/authprovider";
import AuthGuard from "./components/AuthGuard";

//View
import GameSelection from "./view/GameSelection";
import Dashboard from "./view/Dashboard";
import GameStart from "./view/GameStart";

//controller
import AuthController from "./controller/AuthController";
import UserController from "./controller/UserController";
import UserProfileController from "./controller/UserProfileController";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthController />,
  },
  {
    path: "/register",
    element: <UserController />,
  },
  {
    path: "/dashboard",

    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/userprofile",
    element: (
      <AuthGuard>
        <UserProfileController />
      </AuthGuard>
    ),
  },
  {
    path: "/gameselection",
    element: <GameSelection />,
  },
  {
    path: "/gamestart",
    element: (
      <AuthGuard>
        <GameStart />
      </AuthGuard>
    ),
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <PlayerContextProvider>
          <RouterProvider router={router} />
        </PlayerContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
