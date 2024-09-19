import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";

const CustomAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: "hsl(216, 18%, 25%, 0.5)",
  color: "hsl(220, 20%, 65%)",
  padding: ".1rem 1rem",
}));

const WarningMessage = ({ open, message, onClose }) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Posição
        sx={{
          mt: 7,
        }}
      >
        <CustomAlert onClose={onClose} severity="info">
          {message}
        </CustomAlert>
      </Snackbar>
    </>
  );
};

export default WarningMessage;
