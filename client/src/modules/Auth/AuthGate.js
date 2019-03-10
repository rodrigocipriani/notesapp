import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser } from "./authActions";

const AuthGate = ({ loading, user, children }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      loadUser();
      setInitialized(true);
    }
  });
  console.log("user", user);
  if (!user || loading.user) {
    return "Loading user...";
  }
  return children;
};

const mapStateToProps = ({ notesReducer }, ownProps) => {
  return {
    user: notesReducer.user,
    loading: notesReducer.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthGate);
