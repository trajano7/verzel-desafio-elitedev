import { useLocation } from "react-router-dom";
import { clearLocalStorage, getAuthToken } from "../util/authUtils";
import { useAuthCtx } from "../store/AuthContext";
import { useEffect } from "react";
import { fetchUserData } from "../util/apiUtils";

const SessionManager = () => {
  const location = useLocation();
  const { setSessionData, clearCtx } = useAuthCtx();
  const token = getAuthToken();

  const logInHandler = async () => {
    const data = await fetchUserData(token);
    if (data) {
      setSessionData({
        username: data.username,
        idList: data.favoritesIDList,
        visibility: data.isPrivate,
      });
    }
  };

  const signOutHandler = () => {
    clearLocalStorage();
    clearCtx("expired");
  };

  useEffect(() => {
    if (!token) {
      return;
    } else if (token === "EXPIRED") {
      signOutHandler();
    }
  }, [token, location.pathname]);

  useEffect(() => {
    if (token && token !== "EXPIRED") {
      logInHandler();
    }
  }, [token])

  return null;
};

export default SessionManager;

