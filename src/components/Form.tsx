import React from "react";
import { Box, Paper, TextField, Chip, Typography, Grow } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Formik, Form as FormHandle, ErrorMessage, Field } from "formik";
import { fetchFloodHeight } from "../redux/slice/homeReducer";

function Form() {
  const dispatch = useAppDispatch();
  const homeState = useAppSelector((state) => state.home);

  const validationSchema = Yup.object().shape({
    latitude: Yup.number().min(1).required("Latitude is required"),
    longitude: Yup.number().min(1).required("Longitude is required"),
  });

  const initialValues: {
    latitude: number;
    longitude: number;
  } = {
    latitude: 0,
    longitude: 0,
  };

  const onSubmit = (values: typeof initialValues) => {
    dispatch(fetchFloodHeight(values));
  };

  return (
    <Box>
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper
          sx={{
            p: 2,
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Search For Result
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <FormHandle>
              <Field
                name="latitude"
                type="number"
                label="Latitude"
                variant="outlined"
                as={TextField}
                sx={{ mb: 2 }}
                fullWidth
              />
              <ErrorMessage
                render={(msg) => (
                  <Typography variant="caption" color="error">
                    {msg}
                  </Typography>
                )}
                name={"latitude"}
              />

              <Field
                name="longitude"
                type="number"
                label="Longitude"
                variant="outlined"
                as={TextField}
                sx={{ mb: 2 }}
                fullWidth
              />
              <ErrorMessage
                render={(msg) => (
                  <Typography variant="caption" color="error">
                    {msg}
                  </Typography>
                )}
                name={"longitude"}
              />

              <LoadingButton variant="outlined" fullWidth type="submit">
                Process
              </LoadingButton>
            </FormHandle>
          </Formik>
        </Paper>
      </Grow>
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
            {homeState.floodHeightPending && (
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
            {!homeState.floodHeightPending && homeState.floodHeightError && (
              <Chip
                label={homeState.floodHeightError}
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
            {!homeState.floodHeightPending &&
              !homeState.floodHeightError &&
              homeState.floodHeight && (
                <Chip
                  label={`Flood Height: ${homeState.floodHeight}m`}
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
            {!homeState.floodHeightPending &&
              !homeState.floodHeightError &&
              !homeState.floodHeight && (
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
    </Box>
  );
}

export default Form;
