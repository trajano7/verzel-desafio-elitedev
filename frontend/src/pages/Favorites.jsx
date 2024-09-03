import { Box, Divider, Typography } from "@mui/material";
import FavoriteHeader from "../components/FavoriteHeader";
import { getAuthToken } from "../util/authUtil";
import {
  json,
  redirect,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import { useFavorites } from "../store/AuthContext";

const FavoritesPage = () => {
  const { removeFavorite } = useFavorites();
  const data = useLoaderData();
  const { username } = useParams();
  const submit = useSubmit();

  if (!Array.isArray(data) && data.error === 403) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center" }}
      >{`O perfil de ${username} é privado.`}</Typography>
    );
  }

  const onDeleteHandler = (movieID) => {
    removeFavorite(movieID);
    data.filter((item) => item.id !== movieID);
    submit({ movieID: movieID }, { method: "DELETE" });
  };

  const onAddHandler = (movieID) => {
    // pass
  };

  return (
    <Box
      sx={{
        maxWidth: "690px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FavoriteHeader />
      {<Divider sx={{ marginBottom: "4rem" }} />}
      {data.length !== 0 && (
        <MovieGrid
          movies={data}
          onDelete={onDeleteHandler}
          onAdd={onAddHandler}
        />
      )}
      {data.length === 0 && (
        <Typography
          variant="h6"
          sx={{ textAlign: "center" }}
        >{`${username} ainda não possui nenhum filme adicionado a sua lista`}</Typography>
      )}
    </Box>
  );
};

export default FavoritesPage;

export async function loader({ request, params }) {
  const profileUsername = params.username;
  const username = localStorage.getItem("username");

  let headersObj = {};
  if (username === profileUsername) {
    const token = getAuthToken();
    if (!token || token === "EXPIRED") {
      redirect("/");
    }
    headersObj = {
      Authorization: "Bearer " + token,
    };
  }

  const response = await fetch(
    "http://localhost:3000/favorites/" + profileUsername,
    {
      headers: headersObj,
    }
  );

  if (response.status === 403) {
    return { error: response.status };
  }

  if (response.status === 401) {
    alert("Sessão expirada.");
    redirect("/auth?mode=login");
  }

  if (!response.ok) {
    throw json(
      { message: "Could not fetch movies from the user favorites list." },
      {
        status: response.status,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data.movies;
  }
}

export async function action({ request, params }) {
  const username = params.username;
  const method = request.method;
  const data = await request.formData();

  const token = getAuthToken();
  if (!token || token === "EXPIRED") {
    redirect("/auth?mode=login");
  }

  let url = "http://localhost:3000/favorites";

  let body = {};
  let headersObj = {
    Authorization: "Bearer " + token,
  }
  if (method === "PATCH") {
    body.visibility = data.get("visibility");
    headersObj = {
      "Content-Type": "application/json",
      ...headersObj,
    }
  } else if (method === "DELETE") {
    url += "/" + data.get("movieID");
  }

  const response = await fetch(url, {
    method: method,
    headers: headersObj,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw json({ message: "Something went wrong." }, { status: 500 });
  }

  return redirect(`/${username}/favoritos`);
}
