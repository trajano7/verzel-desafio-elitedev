import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthCtxProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [sessionStatus, setSessionStatus] = useState("initial");

  const setSessionData = ({ username, idList, visibility }) => {
    setUsername(username);
    setFavorites(idList);
    setProfileVisibility(visibility);
    setSessionStatus("loggedin");
  };

  const setProfileVisibility = (profileVisibility) => {
    setIsPublic(profileVisibility === "public");
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
    setIsPublic(true);
    setSessionStatus(logOutStatus);
  };

  return (
    <AuthContext.Provider
      value={{
        setProfileVisibility,
        isPublic,
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
