import Header from "../components/Header";
import { Outlet, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Box } from "@mui/material";
import { clearLocalStorage, fetchIDList, getAuthToken, getTokenDuration } from "../util/authUtil";
import { useFavorites } from "../store/AuthContext";

const RootPage = ({ mode, toggleMode }) => {
  const { setFavoritesList, updateUsername, clearCtx, setProfileVisibility } = useFavorites();
  const navigate = useNavigate();
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    const fetchData = async  () => {
      const data = await fetchIDList(token);
      setFavoritesList(data.favoritesIDList);
      setProfileVisibility(data.profileVisibility);
    }

    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      clearLocalStorage();
      clearCtx();
      navigate('/');
      return;
    }

    const username = localStorage.getItem("username");
    updateUsername(username);
    // const profileVisibility = localStorage.getItem("profileVisibility");
    // setProfileVisibility(profileVisibility);
    fetchData();

  }, [token, submit]);
 
  return (
    <>
      <Header mode={mode} toggleMode={toggleMode} />
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default RootPage;

export async function loader() {
  return getAuthToken();
}
