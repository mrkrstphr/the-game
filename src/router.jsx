import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Matchups from "./pages/Matchups.jsx";
import NotFound from "./pages/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "matchups", element: <Matchups /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
