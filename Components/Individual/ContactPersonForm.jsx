"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";

const personInfoValidationSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  role: yup.string().required("Role is required"),
  national_id: yup.string().required("National ID is required"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must contain 6 characters, one uppercase, one lowercase, one number, and one special character"
    ),
  confirm_password: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

 const ContactPersonForm = ({ onNext, onBack, loading }) => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      role: "",
      national_id: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: personInfoValidationSchema,
    onSubmit: (values) => {
      setError("");
      onNext(values);
    },
  });

  return (
    <Box className="flex mt-4">
      <Box className="bg-white w-full ">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              id="first_name"
              label="First Name*"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
              color="success"
              InputProps={{ sx: { height: "52px", padding: "6px" } }}
            />
            <TextField
              fullWidth
              id="last_name"
              label="Last Name*"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
              color="success"
              InputProps={{ sx: { height: "52px", padding: "6px" } }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <PhoneInput
                country={"bd"}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                style={{ width: "100%", height: "48px" }}
                inputStyle={{
                  width: "100%",
                  borderRadius: "0.2rem",
                  height: "52px",
                  border:
                    formik.touched.phone && formik.errors.phone
                      ? "1px solid red"
                      : "1px solid #ccc",
                }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="text-red-600 text-sm mt-1">
                  {formik.errors.phone}
                </span>
              )}
            </div>

            <div className="w-full">
              <TextField
                fullWidth
                id="email"
                label="Email*"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                color="success"
                InputProps={{ sx: { height: "52px", padding: "6px" } }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormControl
              fullWidth
              error={formik.touched.role && Boolean(formik.errors.role)}
              sx={{ minHeight: "52px" }}
            >
              <InputLabel id="role-label">Role*</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                input={<OutlinedInput label="Role*" />}
                color="success"
                sx={{ height: "52px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="System User">System User</MenuItem>
                <MenuItem value="Super Admin">Super Admin</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <FormHelperText>{formik.errors.role}</FormHelperText>
              )}
            </FormControl>

            <TextField
              fullWidth
              id="national_id"
              type="number"
              label="National ID*"
              name="national_id"
              value={formik.values.national_id}
              onChange={formik.handleChange}
              error={
                formik.touched.national_id && Boolean(formik.errors.national_id)
              }
              helperText={
                formik.touched.national_id && formik.errors.national_id
              }
              color="success"
              InputProps={{ sx: { height: "52px", padding: "6px" } }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              id="password"
              label="Password*"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              color="success"
              InputProps={{
                sx: { height: "52px", padding: "6px" },
                endAdornment: formik.values.password && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </IconButton>
                  </InputAdornment>
                ),
                className: "rounded-lg",
              }}
            />

            <TextField
              fullWidth
              id="confirm_password"
              label="Confirm Password*"
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              color="success"
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
              helperText={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
              }
              InputProps={{
                sx: { height: "52px", padding: "6px" },
                endAdornment: formik.values.confirm_password && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <AiFillEyeInvisible />
                      ) : (
                        <AiFillEye />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                className: "rounded-lg",
              }}
            />
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  style={{
                    color: "#007C02",
                  }}
                />
              }
              label={
                <span>
                  <span style={{ color: "black", fontWeight: 400 }}>
                    I agree with DAK Express{" "}
                  </span>
                  <span style={{ color: "green", fontWeight: 400 }}>
                    terms & conditions
                  </span>
                </span>
              }
            />
          </div>

          <div className="flex justify-between gap-4 mt-6 w-full">
            <Button
              type="button"
              onClick={onBack}
              variant="outlined"
              className="bg-gray-200 text-green-600 px-4 py-2 rounded-md shadow-sm w-full"
              sx={{ color: "green", border: "1px solid green" }}
            >
              BACK
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading || !checked}
              sx={{
                backgroundColor: "#688228",
                color: "white",
                "&.Mui-disabled": {
                  backgroundColor: "#A7C27D",
                  color: "white",
                },
              }}
              className="w-full px-6 py-2 rounded-md shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  SIGNING UP...
                  <CircularProgress size={20} sx={{ color: "white" }} />
                </>
              ) : (
                "SUBMIT"
              )}
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
}

export default ContactPersonForm