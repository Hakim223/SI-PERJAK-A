import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Link,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3291/auth/signup", {
          email: values.email,
          password: values.password,
        });

        console.log("Signup successful:", response.data.message);
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h2" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Box mb={2}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <AccountCircleIcon style={{ marginRight: "8px" }} />
                ),
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: <LockIcon style={{ marginRight: "8px" }} />,
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
            sx={{ letterSpacing: "3px" }}
          >
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
        <Typography>
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{ marginLeft: "5px" }}
              variant="body2"
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
