import { Box, Grid } from "@mui/material";
import React from "react";
import Form from "../components/Form";
import image from "../assets/flood3.png";

function Height() {
  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Form />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={image} alt="Flood_Image" width="100%" height="100%" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Height;
