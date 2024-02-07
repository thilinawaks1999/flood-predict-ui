import React from "react";
import Form from "./components/Form";
import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "./redux/hooks";
import { darkTheme, lightTheme } from "./utils/theme";
import NavBar from "./components/NavBar";

function App() {
  const homeState = useAppSelector((state) => state.home);

  const theme = homeState.mode === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Form />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Form />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
