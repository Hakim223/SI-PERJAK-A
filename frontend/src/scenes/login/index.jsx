import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Link
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('')

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
        const response = await axios.post("http://localhost:3291/auth/login", {
          email: values.email,
          password: values.password
        });

        const token = response.data.token;
      } catch {
          console.error("Login failed:", error);
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
          Login
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
            Login
          </Button>
        </form>
        <Box mt={2}>
        <Typography>
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/signup"
              sx={{ marginLeft: "5px" }}
              variant="body2"
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
