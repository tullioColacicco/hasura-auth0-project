import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import contentData from "../utils/contentData";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
const GET_USER = gql`
  {
    users {
      id
      name
    }
  }
`;

export default function Content() {
  const { loading, user } = useAuth0();
  console.log(user);
  const { error, data } = useQuery(GET_USER);
  if (loading || !user) {
    return <Loading />;
  }
  let users = null;
  if (data) {
    users = data.users;
    console.log(data);
    console.log(data.users);
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return (
    <div>
      <h2 className="my-5 text-center">
        What can I do next?{" "}
        {data &&
          users.map(user => {
            return <p key={user.id}>{user.id}</p>;
          })}
      </h2>
    </div>
  );
}
