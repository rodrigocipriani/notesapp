import React, { useEffect, useState, Children } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { storeToken, loadGoogleAuthUrl, loadUser } from "./authActions";
import { Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

let checkUserInterval = null;

const AuthPage = ({
  storeToken,
  location,
  token,
  loadGoogleAuthUrl,
  googleAuthUrl,
  loadUser,
  children,
  user
}) => {
  const [initialized, setInitialized] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  let tokenParam = null;
  if (location) {
    const query = new URLSearchParams(location.search);
    tokenParam = query && query.get("token");
  }

  // window.close();
  console.log("initialized", initialized);
  console.log("tokenParam", tokenParam);
  console.log("token", token);

  if (!user) {
    checkUserInterval = setInterval(() => {
      //check
      console.log("checking user...");
      // loadUser();
    }, 1000);
  } else {
    if (checkUserInterval) {
      clearInterval(checkUserInterval);
    }
  }

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
      <Dialog
        fullScreen={false}
        open={!user}
        // onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Typography variant="h6" id="modal-title">
          Text in a modal
        </Typography>
        <Link href={googleAuthUrl} target="_blank">
          <Button variant="contained" color="primary">
            Login with Google
          </Button>
        </Link>
      </Dialog>
      {user && children}
    </React.Fragment>
  );
};

const mapStateToProps = ({ authReducer }, ownProps) => {
  return {
    user: authReducer.user,
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
