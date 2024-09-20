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

  let warningMsg = "";
  switch (sessionStatus) {
    case "expired":
      warningMsg = "Sessão expirada.";
      break;
    case "loggedout":
      warningMsg = "Sessão encerrada.";
      break;
    case "loggedin":
      warningMsg = "Autenticação realizada com sucesso!";
      break;
  }

  return (
    <>
      <WarningMessage
        message={warningMsg}
        open={isOpen && warningMsg}
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



