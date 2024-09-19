import { alpha } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { gray, brand } from "../themePrimitives";

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        borderRadius: theme.shape.borderRadius,
        textTransform: "none",
        variants: [
          {
            props: {
              color: "primary",
              variant: "contained",
            },
            style: {
              color: gray[50],
              backgroundColor: brand[700],
              "&:hover": {
                backgroundImage: "none",
                backgroundColor: brand[800],
                boxShadow: "none",
              },
            },
          },
          {
            props: {
              variant: "outlined",
            },
            style: {
              color: theme.palette.text.primary,
              border: "1px solid",
              backgroundColor: gray[800],
              borderColor: gray[700],
              "&:hover": {
                backgroundColor: "hsl(0, 100%, 97%)",
                borderColor: gray[600],
              },
              "&:active": {
                backgroundColor: "hsl(0, 100%, 97%)",
              },
            },
          },
          {
            props: {
              variant: "text",
            },
            style: {
              color: gray[50],
              fontWeight: 600,
              fontSize: ".75rem",
              "&:hover": {
                backgroundColor: gray[700],
              },
              "&:active": {
                backgroundColor: alpha(gray[700], 0.7),
              },
            },
          },
        ],
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiOutlinedInput-input": {
          "&:-webkit-autofill": {
            backgroundColor: "transparent !important",
            WebkitBoxShadow: `0 0 0 100px hsl(216, 18%, 6%) inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            caretColor: theme.palette.text.primary,
            borderRadius: theme.shape.borderRadius,
          },
        },
      }),
    },
  },
};