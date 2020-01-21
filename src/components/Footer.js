import React from "react";
import gql from "graphql-tag";

// import {useQuery} from '@apollo/react-hooks';

// const GET_USER = gql`
// query MyQuery {
//   users_by_pk(id: "auth0|5e1fde0cf7ba500e944f61d7") {
//     id
//     name
//   }
// }

// }`;
const Footer = () => (
  <footer className="bg-light p-3 text-center">
    <div className="logo" />
    <p>
      Sample project provided by <a href="https://auth0.com">Auth0</a>
    </p>
  </footer>
);

export default Footer;
