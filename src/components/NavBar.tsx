import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  changeComponent,
  changeTheme,
} from "../redux/slice/homeReducer";
import { Button, MenuItem, Modal } from "@mui/material";
import FloodMap from "./FloodMap";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function NavBar() {
  const dispatch = useAppDispatch();
  const homeState = useAppSelector((state) => state.home);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!homeState.tiffData) {
      //dispatch(fetchTiffData());
    }
  }, [dispatch, homeState.tiffData]);

  const handleModeChange = (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    dispatch(
      changeTheme({
        mode: (event?.target as HTMLInputElement)?.checked ? "light" : "dark",
      })
    );
  };

  const handleClickViewMap = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickHeight = () => {
    dispatch(changeComponent({ component: "height" }));
  };

  const handleClickDamage = () => {
    dispatch(changeComponent({ component: "damage" }));
  };

  const handleClickMap = () => {
    dispatch(changeComponent({ component: "map" }));
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flood Predict
          </Typography>
          <MenuItem onClick={handleClickHeight}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Flood Height
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClickDamage}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Flood Damage
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClickMap}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Generate Map
            </Typography>
          </MenuItem>
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
            label=""
            onClick={handleModeChange}
          />
          <Button
            variant="contained"
            sx={{ m: 1 }}
            color="success"
            onClick={handleClickViewMap}
            disabled={!homeState.tiffData}
          >
            View Map
          </Button>
        
        </Toolbar>
      </AppBar>
      {homeState.tiffData && (
        <Modal
          open={open}
          onClose={handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FloodMap data={homeState.tiffData} />
        </Modal>
      )}
    </Box>
  );
}
