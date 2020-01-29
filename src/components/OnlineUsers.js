import React, { useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/react-hooks";

import gql from "graphql-tag";
// import Paper from "@material-ui/core/Paper";

const OnlineUsers = () => {
  const [onlineIndicator, setOnlineIndicator] = useState(0);
  let onlineUsersList;
  useEffect(() => {
    // Every 30s, run a mutation to tell the backend that you're online
    updateLastSeen();
    setOnlineIndicator(setInterval(() => updateLastSeen(), 30000));

    return () => {
      // Clean up
      clearInterval(onlineIndicator);
    };
  }, []);
  const UPDATE_LASTSEEN_MUTATION = gql`
    mutation updateLastSeen($now: timestamptz!) {
      update_users(where: {}, _set: { last_seen: $now }) {
        affected_rows
      }
    }
  `;
  const [updateLastSeenMutation] = useMutation(UPDATE_LASTSEEN_MUTATION);
  const updateLastSeen = () => {
    // Use the apollo client to run a mutation to update the last_seen value
    updateLastSeenMutation({
      variables: { now: new Date().toISOString() }
    });
  };

  const { loading, error, data } = useSubscription(
    gql`
      subscription getOnlineUsers {
        online_users(order_by: { user: { name: asc } }) {
          id
          user {
            name
          }
        }
      }
    `
  );

  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    console.error(error);
    return <span>Error!</span>;
  }
  if (data) {
    console.log(data);
    onlineUsersList = data.online_users.map(u => (
      <div key={u.id} user={u.user}>
        <p> {u.user.username}</p>
      </div>
    ));
  }

  return (
    <div>
      <br />
      <br />

      <h2>Online Users</h2>
      {/* <Paper> */}
      <div className="onlineUsersWrapper">
        <div className="sliderHeader">
          <h5>Online users - {onlineUsersList.length}</h5>
        </div>

        {data &&
          data.online_users.map(u => {
            console.log(u.user);
            return (
              <div key={u.id} user={u.user}>
                <p> {u.user.name}</p>
              </div>
            );
          })}
      </div>
      {/* <div className="logo" />
        <p>
          Sample project provided by <a href="https://auth0.com">Auth0</a>
        </p> */}
      {/* </Paper> */}
    </div>
  );
};

export default OnlineUsers;
