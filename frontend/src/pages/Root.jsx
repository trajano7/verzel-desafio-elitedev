import Header from "../components/Header";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Box, Button } from "@mui/material";
import { getAuthToken } from "../util/authUtils";
import { useAuthCtx } from "../store/AuthContext";
import SessionManager from "../components/SessionManger";
import WarningMessage from "../components/WarningCard";

const RootPage = ({ mode, toggleMode }) => {
  const { sessionStatus } = useAuthCtx();
  const [isOpen, setIsOpen] = useState(false);

  const warningTimeoutHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (sessionStatus !== "initial") {
      setIsOpen(true);
    }
  }, [sessionStatus]);

  let warningMsg = "Autenticação realizada com sucesso!";
  if (sessionStatus === "expired") {
    warningMsg = "Sessão expirada.";
  }

  return (
    <>
      <WarningMessage
        message={warningMsg}
        open={isOpen}
        onClose={warningTimeoutHandler}
      />
      <Header mode={mode} toggleMode={toggleMode} />
      <SessionManager />
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default RootPage;



