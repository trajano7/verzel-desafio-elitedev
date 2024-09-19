import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import RootPage from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import getBlogTheme from "./themes/getAppTheme";
import MoviePage, { loader as movieLoader } from "./pages/Movie";
import HomePage, { loader as moviesLoader } from "./pages/Home";
import { AuthCtxProvider } from "./store/AuthContext";
import FavoritesPage, { loader as favoritesLoader } from "./pages/Favorites";
import ErrorPage from "./pages/Error";
import { action as authAction } from "./actions/authAction";
import { action as moviesAction } from "./actions/moviesAction";
import AuthPage from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: moviesLoader,
        action: moviesAction,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: "/movies/:movieID",
        element: <MoviePage />,
        loader: movieLoader,
        action: moviesAction,
      },
      {
        path: "/:username/favoritos",
        element: <FavoritesPage />,
        action: moviesAction,
        loader: favoritesLoader,
      },
    ],
  },
]);

function App() {
  const appTheme = createTheme(getBlogTheme("dark"));

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthCtxProvider>
        <RouterProvider router={router} />
      </AuthCtxProvider>
    </ThemeProvider>
  );
}

export default App;
