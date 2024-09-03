import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import RootPage, { loader as rootLoader } from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import getBlogTheme from "./themes/getAppTheme";
import MoviePage, { loader as movieLoader } from "./pages/Movie";
import HomePage, { loader as moviesLoader } from "./pages/Home";
import AuthPage, { action as authAction } from "./pages/Auth";
import { FavoritesProvider } from "./store/AuthContext";
import FavoritesPage, {
  action as favoritesAction,
  loader as favoritesLoader,
} from "./pages/Favorites";
import { action as manipulateFavoriteAction } from "./util/authUtil";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: moviesLoader,
        action: manipulateFavoriteAction,
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
        action: manipulateFavoriteAction,
      },
      {
        path: "/:username/favoritos",
        element: <FavoritesPage />,
        action: favoritesAction,
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
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
