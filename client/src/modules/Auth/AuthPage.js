import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { storeToken, loadGoogleAuthUrl, loadUser } from "./authActions";
import { Link } from "@material-ui/core";

const AuthPage = ({
  storeToken,
  location,
  token,
  loadGoogleAuthUrl,
  googleAuthUrl,
  loadUser
}) => {
  const [initialized, setInitialized] = useState(false);
  let tokenParam = null;
  if (location) {
    const query = new URLSearchParams(location.search);
    tokenParam = query && query.get("token");
  }

  // window.close();
  console.log("initialized", initialized);
  console.log("tokenParam", tokenParam);
  console.log("token", token);
  useEffect(() => {
    if (!initialized) {
      if (tokenParam) {
        storeToken(tokenParam);
      }
      if (!token && !googleAuthUrl) {
        loadGoogleAuthUrl();
      }
      setInitialized(true);
    }
    if (token && tokenParam) {
      loadUser();
    }
  });

  return (
    <React.Fragment>
      <Link href={googleAuthUrl}>
        <Button variant="contained" color="primary">
          Login with Google
        </Button>
      </Link>
    </React.Fragment>
  );
};

const mapStateToProps = ({ authReducer }, ownProps) => {
  return {
    token: authReducer.token,
    googleAuthUrl: authReducer.googleAuthUrl
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  storeToken: token => dispatch(storeToken(token)),
  loadGoogleAuthUrl: () => dispatch(loadGoogleAuthUrl()),
  loadUser: () => dispatch(loadUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
