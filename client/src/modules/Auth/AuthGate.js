import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser } from "./authActions";
import AuthPage from "./AuthPage";

const AuthGate = ({ loading, user, children, loadUser }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      loadUser(null);
      setInitialized(true);
    }
  });
  console.log("user", user);
  if (!user || loading.user) {
    return <AuthPage />;
    // return "Loading user...";
  }
  return children;
};

const mapStateToProps = ({ authReducer }, ownProps) => {
  return {
    user: authReducer.user,
    loading: authReducer.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthGate);
