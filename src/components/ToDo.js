import React from "react";

// import { Row, Col } from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
// import contentData from "../utils/contentData";
import { useMutation } from "@apollo/react-hooks";
// import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
// import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

const CHANGE_COMPLETED = gql`
  mutation MyMutation($id: uuid!, $is_completed: Boolean!) {
    update_todoes(
      where: { id: { _eq: $id } }
      _set: { is_completed: $is_completed }
    ) {
      returning {
        id
        is_completed
        title
        user_id
      }
    }
  }
`;
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
        created_at
      }
    }
  }
`;

const ToDo = ({ todo }) => {
  const { user } = useAuth0();
  console.log(todo);

  const [toggleCompleted] = useMutation(CHANGE_COMPLETED, {
    variables: { id: todo.id, is_completed: !todo.is_completed },
    refetchQueries: [{ query: GET_USER_TO_DOS, variables: { id: user.sub } }]
    // update() {
    //   values = ''
    // }
  });

  const handleCheck = () => {
    toggleCompleted();
  };
  return (
    <div key={todo.id}>
      <p
        key={todo.id}
        style={{
          textDecoration: todo.is_completed ? "line-through" : null
        }}
      >
        <Checkbox
          key={todo.id}
          checked={todo.is_completed}
          onClick={handleCheck}
          value="secondary"
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        {todo.title}
      </p>
      <hr />
      <div></div>
    </div>
  );
};

export default ToDo;
