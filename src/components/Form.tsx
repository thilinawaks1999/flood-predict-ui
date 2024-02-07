import React from "react";
import { Box, Paper, TextField, Button } from "@mui/material";

function Form() {
  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          label="Latitude"
          variant="outlined"
          sx={{ mb: 2 }}
          fullWidth
        />
        <TextField
          label="Longitude"
          variant="outlined"
          sx={{ mb: 2 }}
          fullWidth
        />
        <Button variant="outlined" fullWidth>
          Process
        </Button>
      </Paper>
    </Box>
  );
}

export default Form;
