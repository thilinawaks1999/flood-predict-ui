import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchTiffDataWithStreamData } from "../redux/slice/homeReducer";
import { Box, Paper, TextField, Typography, Grow, Modal } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { Formik, Form as FormHandle, ErrorMessage, Field } from "formik";
import FloodMap from "../components/FloodMap";
import { useAppSelector } from "../redux/hooks";

function MapForm() {
  const dispatch = useAppDispatch();

  const homeState = useAppSelector((state) => state.home);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const validationSchema = Yup.object().shape({
    upstream1: Yup.number().min(1).required("upstream1 is required"),
    upstream2: Yup.number().min(1).required("upstream1 is required"),
    downstream1: Yup.number().min(1).required("Building Age is required"),
    downstream2: Yup.number().min(1).required("Estimated Value is required"),
  });

  const initialValues: {
    upstream1: number;
    upstream2: number;
    downstream1: number;
    downstream2: number;
  } = {
    upstream1: 0,
    upstream2: 0,
    downstream1: 0,
    downstream2: 0,
  };

  const onSubmit = (values: typeof initialValues) => {
    dispatch(fetchTiffDataWithStreamData(values));
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
            Search For Map
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <FormHandle>
              <Field
                name="upstream1"
                type="number"
                label="Fist Upstream"
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
                name={"upstream1"}
              />

              <Field
                name="upstream2"
                type="number"
                label="Second Upstream2"
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
                name={"upstream2"}
              />

              <Field
                name="downstream1"
                type="number"
                label="First DownStream"
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
                name={"downstream1"}
              />

              <Field
                name="downstream2"
                type="number"
                label="Second DownStream"
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
                name={"downstream2"}
              />

              <LoadingButton
                variant="outlined"
                fullWidth
                type="submit"
                onClick={handleOpen}
              >
                Generate Map
              </LoadingButton>
            </FormHandle>
          </Formik>
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
        </Paper>
      </Grow>
    </Box>
  );
}

export default MapForm;
