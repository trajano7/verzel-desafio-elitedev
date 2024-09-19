import { Box, Typography } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import SearchMovies from "../components/SearchMovies";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import PaginationLink from "../components/PageManager";
import { useEffect } from "react";
import { useAuthCtx } from "../store/AuthContext";
import PageContent from "../components/PageContent";
import { apiRequest } from "../services/apiService";

const HomePage = () => {
  const submit = useSubmit();
  const { removeFavorite, addFavorite } = useAuthCtx();
  const navigate = useNavigate();
  const data = useLoaderData();

  const pageCount = data ? data.pagination.totalPages : null;
  const page = data ? data.pagination.page : 0;

  const searchHandler = (query) => {
    navigate(`?query=${query}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const onDeleteHandler = (movieID) => {
    removeFavorite(movieID);
    submit({ movieID: movieID }, { method: "DELETE" });
  };

  const onAddHandler = (movieID) => {
    addFavorite(movieID);
    submit({ movieID: movieID }, { method: "POST" });
  };

  const noQuery = !pageCount && page === 0;
  const notFound = (data && data.movies && data.movies.length === 0);

  return (
    <Box
      sx={{
        maxWidth: "690px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchMovies onSearch={searchHandler} />
      {notFound && (
        <PageContent title={""}>
          Nenhum resultado encontrado para sua pesquisa
        </PageContent>
      )}
      {(!notFound && !noQuery) && (
        <MovieGrid
          movies={data.movies}
          onDelete={onDeleteHandler}
          onAdd={onAddHandler}
        />
      )}
      {(!notFound && !noQuery) && <PaginationLink pageCount={pageCount} />}
    </Box>
  );
};

export default HomePage;

export async function loader({ request, params }) {
  const query = new URL(request.url).searchParams.get("query");
  const page = new URL(request.url).searchParams.get("page");

  if (!query) {
    return null;
  }

  const currentPage = page ? page : "";
  const endpoint = `movies/?query=${query}&page=${currentPage}`;
  try {
    const response = await apiRequest(endpoint);
    return response.data;
  } catch (error) {
    throw json({ message: "Something went wrong." }, { status: 500 });
  }
}
