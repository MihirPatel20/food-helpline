import { createTheme } from "@mui/material/styles";

const themeOld = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9461",
      light: "#4caf7d",
      dark: "#1b724a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#66bb6a",
      light: "#98ee99",
      dark: "#338a3e",
      contrastText: "#000000",
    },
    background: {
      default: "#f5f8f5",
      paper: "#ffffff",
    },
    success: {
      main: "#43a047",
      light: "#76d275",
      dark: "#00701a",
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
