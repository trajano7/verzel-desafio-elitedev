import React, { createContext, useState, useContext } from "react";

// Cria o contexto
const FavoritesContext = createContext();

// Provedor do contexto
export const FavoritesProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  const setProfileVisibility = (profileVisibility) => {
    setIsPublic(profileVisibility === "public");
  };

  // Atualiza o nome de usuário
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
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

  // Substitui a lista de favoritos com uma nova lista
  const setFavoritesList = (newFavoritesList) => {
    setFavorites(newFavoritesList);
  };

  const clearCtx = () => {
    setUsername("");
    setFavorites([]);
    setIsPublic(true);
  };

  return (
    <FavoritesContext.Provider
      value={{
        setProfileVisibility,
        isPublic,
        clearCtx,
        username,
        updateUsername,
        favorites,
        addFavorite,
        removeFavorite,
        setFavoritesList,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useFavorites = () => useContext(FavoritesContext);
