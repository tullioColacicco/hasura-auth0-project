import React, { Fragment } from "react";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Hero from "../components/Hero";

const Home = () => (
  <Fragment>
    <Container maxWidth="lg">
      <Hero />

      {/* 
      <Content /> */}
      {/* <Typography
        component="div"
        style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
      /> */}
    </Container>
  </Fragment>
);

export default Home;
