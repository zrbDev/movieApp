import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import Home from "./pages/Home.tsx";
import MovieDetails from "./pages/MovieDetails.tsx";

function App() {
  return (
    <>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Movie App
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie-detail/:id" element={<MovieDetails />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
