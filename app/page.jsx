import { Box, Container, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm.jsx";

const Home = () => {
  return (
    <Box
      minHeight="86vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={4}
    >
      <Container maxWidth="sm">
        <Box
          bgcolor="white"
          borderRadius={2}
          boxShadow={3}
          p={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h4" fontWeight={800} mb={2}>
            Sign In
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={4}
            textAlign="center"
          >
            Fill in the fields below to sign in into your account.
          </Typography>
          <LoginForm />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
