import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchFloodDamage } from "../redux/slice/homeReducer";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Grow,
  MenuItem,
  Select,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { Formik, Form as FormHandle, ErrorMessage, Field } from "formik";

function SecondForm() {
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    latitude: Yup.number().min(1).required("Latitude is required"),
    longitude: Yup.number().min(1).required("Longitude is required"),
    buildingAge: Yup.number().min(1).required("Building Age is required"),
    estimatedValue: Yup.number().min(1).required("Estimated Value is required"),
    floors: Yup.number().min(1).required("Floors is required"),
    buildingHeight: Yup.number().min(1).required("Building Height is required"),
    walls: Yup.string().required("Walls is required"),
    roof: Yup.string().required("Roof is required"),
    pillars: Yup.string().required("Pillars is required"),
  });

  const initialValues: {
    latitude: number;
    longitude: number;
    buildingAge: number;
    estimatedValue: number;
    floors: number;
    buildingHeight: number;
    walls: string;
    roof: string;
    pillars: string;
  } = {
    latitude: 0,
    longitude: 0,
    buildingAge: 0,
    estimatedValue: 0,
    floors: 0,
    buildingHeight: 0,
    walls: "",
    roof: "",
    pillars: "",
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
                variant="standard"
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
                variant="standard"
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
                name="buildingAge"
                type="number"
                label="Building Age"
                variant="standard"
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

              <Field
                name="estimatedValue"
                type="number"
                label="Estimated Value"
                variant="standard"
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
                name={"estimatedValue"}
              />

              <Field
                name="floors"
                type="number"
                label="Floors"
                variant="standard"
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
                name={"floors"}
              />

              <Field
                name="buildingHeight"
                type="number"
                label="Building Height"
                variant="standard"
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
                name={"buildingHeight"}
              />

              <Field
                name="walls"
                as={Select}
                label="Walls"
                variant="standard"
                displayEmpty
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">
                  <em>Walls</em>
                </MenuItem>
                <MenuItem value="Brick">Brick</MenuItem>
                <MenuItem value="Block">Block</MenuItem>
              </Field>

              <ErrorMessage
                render={(msg) => (
                  <Typography variant="caption" color="error">
                    {msg}
                  </Typography>
                )}
                name={"walls"}
              />

              <Field
                name="roof"
                as={Select}
                label="Roof"
                variant="standard"
                displayEmpty
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">
                  <em>Roof</em>
                </MenuItem>
                <MenuItem value="Asbestos">Asbestos</MenuItem>
                <MenuItem value="Roofing tiles<">Roofing tiles</MenuItem>
              </Field>

              <ErrorMessage
                render={(msg) => (
                  <Typography variant="caption" color="error">
                    {msg}
                  </Typography>
                )}
                name={"roof"}
              />

              <Field
                name="pillars"
                as={Select}
                label="Pillars"
                variant="standard"
                displayEmpty
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">
                  <em>Pillars</em>
                </MenuItem>
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Concrete">Concrete</MenuItem>
              </Field>

              <ErrorMessage
                render={(msg) => (
                  <Typography variant="caption" color="error">
                    {msg}
                  </Typography>
                )}
                name={"pillars"}
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
