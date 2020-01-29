import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuth0 } from "../react-auth0-spa";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Paper
} from "@material-ui/core";
import Content from "../components/Content";
import logo from "../assets/logo.svg";
const MAKE_TO_DO = gql`
  mutation MyMutation($title: String!, $is_public: Boolean!) {
    insert_todoes(objects: { title: $title, is_public: $is_public }) {
      returning {
        id
        title
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
      }
    }
  }
`;

const Hero = () => {
  const { user } = useAuth0();
  const [values, setValues] = useState("");
  console.log(values);
  const [createToDo] = useMutation(MAKE_TO_DO, {
    variables: { title: values, is_public: true },
    refetchQueries: [{ query: GET_USER_TO_DOS, variables: { id: user.sub } }]
    // update() {
    //   values = ''
    // }
  });

  const onChange = event => {
    setValues(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    createToDo();
    setValues("");
  };
  return (
    <Paper>
      <div className="text-center hero my-5">
        <img src={logo} alt="React logo" width="120" />
        <h1 className="mb-4">Lets make a To Do List!</h1>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="my-input">Create To Do</InputLabel>
            <Input
              onSubmit={handleSubmit}
              id="my-input"
              onChange={onChange}
              value={values}
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              prepare yourself!
            </FormHelperText>
          </FormControl>
        </form>
      </div>
      <hr />
      <Content />
    </Paper>
  );
};

export default Hero;
