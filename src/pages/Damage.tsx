import { Box, Chip, Grid, Grow, Paper, Typography } from "@mui/material";
import React from "react";
import SecondForm from "../components/SecondForm";
import { useAppSelector } from "../redux/hooks";

export default function Damage() {
  const homeState = useAppSelector((state) => state.home);
  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <SecondForm />
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
          <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1000 } : {})}
          >
            <Paper
              sx={{
                p: 9,
                m: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Predicted Result
                </Typography>
                {homeState.floodDamagePending && (
                  <Chip
                    label={"Loading..."}
                    sx={{
                      m: 5,
                      px: 10,
                      py: 4,
                      borderRadius: 5,
                      fontSize: "1.5rem",
                    }}
                    color={"info"}
                  />
                )}
                {!homeState.floodDamagePending &&
                  homeState.floodDamageError && (
                    <Chip
                      label={homeState.floodDamageError}
                      sx={{
                        m: 5,
                        px: 10,
                        py: 4,
                        borderRadius: 5,
                        fontSize: "1.5rem",
                      }}
                      color={"error"}
                    />
                  )}
                {!homeState.floodDamagePending &&
                  !homeState.floodDamageError &&
                  homeState.floodDamage && (
                    <Chip
                      label={`Flood Height: ${homeState.floodDamage}m`}
                      sx={{
                        m: 5,
                        px: 10,
                        py: 4,
                        borderRadius: 5,
                        fontSize: "1.5rem",
                      }}
                      color={"success"}
                    />
                  )}
                {!homeState.floodDamagePending &&
                  !homeState.floodDamageError &&
                  !homeState.floodDamage && (
                    <Chip
                      label={`See the result here`}
                      sx={{
                        m: 5,
                        px: 10,
                        py: 4,
                        borderRadius: 5,
                        fontSize: "1.5rem",
                      }}
                      color={"warning"}
                    />
                  )}
              </Box>
            </Paper>
          </Grow>
        </Grid>
      </Grid>
    </Box>
  );
}
