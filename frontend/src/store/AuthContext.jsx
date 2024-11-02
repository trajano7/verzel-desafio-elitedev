import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthCtxProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isPrivate, setIsPrivate] = useState(true);
  const [sessionStatus, setSessionStatus] = useState("initial");

  const setSessionData = ({ username, idList, visibility }) => {
    setUsername(username);
    setFavorites(idList);
    setProfileVisibility(visibility);
    setSessionStatus("loggedin");
  };

  const setProfileVisibility = (visibility) => {
    setIsPrivate(visibility);
  };

  // Adiciona um filme aos favoritos
  const addFavorite = (movieId) => {
    setFavorites((prevFavorites) => [...prevFavorites, movieId]);
  };

  // Remove um filme dos favoritos
  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== movieId)
    );
  };

  const clearCtx = (logOutStatus = "loggedout") => {
    setUsername("");
    setFavorites([]);
    setIsPrivate(false);
    setSessionStatus(logOutStatus);
  };

  return (
    <AuthContext.Provider
      value={{
        setProfileVisibility,
        isPrivate,
        clearCtx,
        username,
        favorites,
        addFavorite,
        removeFavorite,
        setSessionData,
        sessionStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuthCtx = () => useContext(AuthContext);
