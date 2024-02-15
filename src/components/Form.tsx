import React from "react";
import {
  Box,
  Paper,
  TextField,
  Chip,
  Typography,
  LinearProgressProps,
  LinearProgress,
  Skeleton,
  Grow,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchData } from "../redux/slice/homeReducer";
import { Formik, Form as FormHandle, ErrorMessage, Field } from "formik";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function Form() {
  const [progress, setProgress] = React.useState(10);
  const dispatch = useAppDispatch();
  const homeState = useAppSelector((state) => state.home);

  const loadToValue = homeState.riskPercentage;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= loadToValue ? loadToValue : prevProgress + 1
      );
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, [
    dispatch,
    homeState.riskPercentage,
    homeState.processPending,
    homeState.percentagePending,
    loadToValue,
  ]);

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
    dispatch(fetchData(values));
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

              <LoadingButton
                variant="outlined"
                fullWidth
                type="submit"
                loading={homeState.processPending}
                disabled={homeState.processPending}
              >
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
            <Chip
              label={homeState.riskLevel || "See Result Here"}
              sx={{ m: 5, px: 10, py: 4, borderRadius: 5, fontSize: "1.5rem" }}
              color={
                homeState.riskLevel === "Low"
                  ? "info"
                  : homeState.riskLevel === "Medium"
                  ? "warning"
                  : homeState.riskLevel === "High"
                  ? "error"
                  : "success"
              }
            />
          </Box>
          <Typography variant="h6" gutterBottom>
            Predicted Risk Percentage
          </Typography>
          {homeState.percentagePending ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem", my: 2 }} />
          ) : (
            <LinearProgressWithLabel
              sx={{
                my: 2,
              }}
              value={progress}
            />
          )}
        </Paper>
      </Grow>
    </Box>
  );
}

export default Form;
