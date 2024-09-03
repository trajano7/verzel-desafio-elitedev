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
              color: "white",
              backgroundColor: gray[900],
              "&:hover": {
                backgroundImage: "none",
                backgroundColor: gray[700],
                boxShadow: "none",
              },
              ...theme.applyStyles("dark", {
                color: gray[50],
                backgroundColor: brand[700],
                "&:hover": {
                  backgroundColor: brand[800],
                },
              }),
            },
          },
          {
            props: {
              variant: "outlined",
            },
            style: {
              color: theme.palette.text.primary,
              border: "1px solid",
              borderColor: gray[200],
              backgroundColor: alpha(gray[50], 0.3),
              "&:hover": {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              "&:active": {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles("dark", {
                backgroundColor: gray[800],
                borderColor: gray[700],
                "&:hover": {
                  backgroundColor: gray[900],
                  borderColor: gray[600],
                },
                "&:active": {
                  backgroundColor: gray[900],
                },
              }),
            },
          },
          {
            props: {
              variant: "text",
            },
            style: {
              color: gray[600],
              fontWeight: 600,
              fontSize: ".75rem",
              "&:hover": {
                backgroundColor: gray[100],
              },
              "&:active": {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles("dark", {
                color: gray[50],
                "&:hover": {
                  backgroundColor: gray[700],
                },
                "&:active": {
                  backgroundColor: alpha(gray[700], 0.7),
                },
              }),
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        textTransform: "none",
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        color: theme.palette.text.primary,
        "&:hover": {
          backgroundColor: gray[100],
          borderColor: gray[300],
        },
        ...theme.applyStyles("dark", {
          "&:hover": {
            backgroundColor: gray[500],
          },
        }),
        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              width: "2.25rem",
              height: "2.25rem",
              padding: "0.25rem",
              [`& .${svgIconClasses.root}`]: { fontSize: "1rem" },
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              width: "2.5rem",
              height: "2.5rem",
            },
          },
        ],
      }),
    },
  },
};
