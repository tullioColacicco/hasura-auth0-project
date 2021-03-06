import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
// import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
import Home from "./views/Home";
import OnlineUsers from "./components/OnlineUsers";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// styles
import "./App.css";

// apollo settings
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
// import { setContext } from "apollo-link-context";
// import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from "apollo-utilities";
// import { createUploadLink } from "apollo-upload-client";
// import { createHttpLink } from "apollo-link-http";
// import { HttpLink } from "apollo-boost";
// fontawesome
import initFontAwesome from "./utils/initFontAwesome";

// const { isAuthenticated, user } = useAuth0();

// used state to get accessToken through getTokenSilently(), the component re-renders when state changes, thus we have
// our accessToken in apollo client instance.

initFontAwesome();
// const createApolloClient = authToken => {
//   console.log(authToken);
//   return new ApolloClient({
//     link: new HttpLink({
//       uri: "https://hasura-postgres-backend.herokuapp.com/v1/graphql",
//       headers: {
//         Authorization: authToken ? `Bearer ${authToken}` : ""
//       }
//     }),
//     cache: new InMemoryCache()
//   });
// };

const createApolloClient = authToken => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "wss://hasura-postgres-backend.herokuapp.com/v1/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      }
    }),
    cache: new InMemoryCache()
  });
};

const App = ({ idToken }) => {
  // let token = false;
  // token = idToken;
  const { loading } = useAuth0();
  if (loading || !idToken) {
    return loading;
  }

  const client = createApolloClient(idToken);

  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div
          style={{
            backgroundColor: "white"
          }}
          id="app"
          className="d-flex flex-column h-100"
        >
          <NavBar />

          <Grid container>
            <Grid container spacing={3}>
              <Grid item xs>
                {/* <Paper>xs</Paper> */}
              </Grid>
              <Grid item xs={6}>
                <Paper>xs=6</Paper>
                <Container className="flex-grow-1 mt-5">
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <PrivateRoute path="/profile" component={Profile} />
                  </Switch>
                </Container>
              </Grid>
              <Grid item xs>
                {/* <Paper>xs</Paper> */}
                <OnlineUsers />
              </Grid>
            </Grid>
          </Grid>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
