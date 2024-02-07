import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },

  shape: {
    borderRadius: 10,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },

  shape: {
    borderRadius: 10,
  },
});
