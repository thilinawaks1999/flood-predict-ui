import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchFloodDamage } from "../redux/slice/homeReducer";
import { Box, Paper, TextField, Typography, Grow } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { Formik, Form as FormHandle, ErrorMessage, Field } from "formik";

function SecondForm() {
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    latitude: Yup.number().min(1).required("Latitude is required"),
    longitude: Yup.number().min(1).required("Longitude is required"),
    buildingType: Yup.string().required("Building Type is required"),
    buildingMaterials: Yup.string().required("Building Materials is required"),
    buildingAge: Yup.number().min(1).required("Building Age is required"),
  });

  const initialValues: {
    latitude: number;
    longitude: number;
    buildingType: string;
    buildingMaterials: string;
    buildingAge: number;
  } = {
    latitude: 0,
    longitude: 0,
    buildingType: "",
    buildingMaterials: "",
    buildingAge: 0,
  };

  const onSubmit = (values: typeof initialValues) => {
    dispatch(fetchFloodDamage(values));
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

              <Field
                name="buildingType"
                label="Building Type"
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
                name={"buildingType"}
              />

              <Field
                name="buildingMaterials"
                label="Building Materials"
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
                name={"buildingMaterials"}
              />

              <Field
                name="buildingAge"
                type="number"
                label="Building Age"
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
                name={"buildingAge"}
              />

              <LoadingButton variant="outlined" fullWidth type="submit">
                Process
              </LoadingButton>
            </FormHandle>
          </Formik>
        </Paper>
      </Grow>
    </Box>
  );
}

export default SecondForm;
