import { createTheme, alpha } from "@mui/material/styles";

const customTheme = createTheme();

export const brand = {
  100: "hsl(216, 18%, 97%)",
  200: "hsl(216, 18%, 90%)",
  300: "hsl(216, 18%, 80%)",
  400: "hsl(216, 18%, 65%)",
  500: "hsl(216, 18%, 40%)",
  600: "hsl(216, 18%, 30%)",
  700: "hsl(216, 18%, 25%)",
  800: "hsl(216, 18%, 18%)",
  900: "hsl(216, 18%, 12%)",
  1000: "hsl(216, 18%, 6%)",
};

export const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      contrastText: brand[50],
      light: brand[300],
      main: brand[400],
      dark: brand[900],
    },
    grey: {
      ...gray,
    },
    divider: alpha(gray[700], 0.6),
    background: {
      default: brand[1000],
      paper: brand[900],
    },
    text: {
      primary: "hsl(0, 0%, 100%)",
      secondary: gray[400],
    },
    action: {
      hover: alpha(gray[600], 0.2),
      selected: alpha(gray[600], 0.3),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(","),
    h1: {
      fontSize: customTheme.typography.pxToRem(48),
      fontWeight: 600,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: customTheme.typography.pxToRem(36),
      fontWeight: 600,
    },
    h3: {
      fontSize: customTheme.typography.pxToRem(30),
    },
    h4: {
      fontSize: customTheme.typography.pxToRem(24),
      fontWeight: 600,
    },
    h5: {
      fontSize: customTheme.typography.pxToRem(20),
      fontWeight: 600,
    },
    h6: {
      fontSize: customTheme.typography.pxToRem(18),
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: customTheme.typography.pxToRem(18),
    },
    subtitle2: {
      fontSize: customTheme.typography.pxToRem(14),
      fontWeight: 500,
    },
    body1: {
      fontSize: customTheme.typography.pxToRem(14),
    },
    body2: {
      fontSize: customTheme.typography.pxToRem(14),
      fontWeight: 400,
    },
    caption: {
      fontSize: customTheme.typography.pxToRem(12),
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "hsla(220, 30%, 5%, 0) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0) 0px 8px 16px -5px",
  ],
});
