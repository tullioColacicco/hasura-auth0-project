import React from "react";

// import { Row, Col } from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
// import contentData from "../utils/contentData";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loading from "../components/Loading";
import ToDo from "../components/ToDo";
import { useAuth0 } from "../react-auth0-spa";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import Checkbox from "@material-ui/core/Checkbox";
// const GET_USER = gql`
//   {
//     users {
//       id
//       name
//     }
//   }
// `;
const GET_USER_TO_DOS = gql`
  query MyQuery($id: String!) {
    users_by_pk(id: $id) {
      name
      id
      todoes {
        id
        title
        user_id
        is_completed
      }
    }
  }
`;
// const CHANGE_COMPLETED = gql`
//   mutation MyMutation($id: ID!, $is_completed: Boolean!) {
//     update_todoes(
//       where: { id: { _eq: $id } }
//       _set: { is_completed: $is_completed }
//     ) {
//       returning {
//         id
//         is_completed
//         title
//         user_id
//       }
//     }
//   }
// `;
const DELETE_ALL_TODOES = gql`
  mutation MyMutation($user_id: String!) {
    delete_todoes(where: { user_id: { _eq: $user_id } }) {
      affected_rows
    }
  }
`;

export default function Content() {
  const { loading, user } = useAuth0();
  console.log(user.sub);
  const userId = user.sub;
  console.log(userId);
  // const { error, data } = useQuery(GET_USER);
  const { error, data } = useQuery(GET_USER_TO_DOS, {
    variables: { id: userId }
  });
  const [deleteTodoes] = useMutation(DELETE_ALL_TODOES, {
    variables: { user_id: user.sub },
    refetchQueries: [{ query: GET_USER_TO_DOS, variables: { id: user.sub } }]
    // update() {
    //   values = ''
    // }
  });
  // const [toggleCompleted] = useMutation(CHANGE_COMPLETED, {
  //   variables: { id: userId, is_public: true },
  //   refetchQueries: [{ query: GET_USER_TO_DOS, variables: { id: user.sub } }]
  //   // update() {
  //   //   values = ''
  //   // }
  // });

  // const handleCheck = (id, completed) => {
  //   toggleCompleted(id, completed);
  // };
  if (loading || !user) {
    return <Loading />;
  }
  let todoes = null;
  if (data) {
    todoes = data.users_by_pk.todoes;
    console.log(data);
    console.log(data.users_by_pk.todoes);
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
        Things to do
        <br />
        <Button onClick={deleteTodoes} variant="contained">
          CLEAR
        </Button>
      </h2>

      <Paper color="blue">
        <Paper>
          {data &&
            todoes.map(todo => {
              return <ToDo key={todo.id} todo={todo} {...todo} />;
            })}
        </Paper>
      </Paper>
    </div>
  );
}
