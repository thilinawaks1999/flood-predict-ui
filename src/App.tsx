import { CssBaseline, ThemeProvider } from "@mui/material";
import { useAppSelector } from "./redux/hooks";
import { darkTheme, lightTheme } from "./utils/theme";
import NavBar from "./components/NavBar";
import Damage from "./pages/Damage";
import Height from "./pages/Height";

function App() {
  const homeState = useAppSelector((state) => state.home);

  const theme = homeState.mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {homeState.currentComponent === "height" ? <Height /> : <Damage />}
    </ThemeProvider>
  );
}

export default App;
