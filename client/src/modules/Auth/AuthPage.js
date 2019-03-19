import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { loadGoogleAuthUrl, loadUser } from "./authActions";
import { Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Cookies from "js-cookie";

const LASTFULLPATH_COOKIE_NAME = "lastFullPath";

const AuthPage = ({
  location,
  history,
  loadGoogleAuthUrl,
  googleAuthUrl,
  loadUser,
  children,
  user,
  loading
}) => {
  const [initialized, setInitialized] = useState(false);

  const { pathname, search } = location;
  const isShowLogin = !user && !loading.user;

  useEffect(() => {
    if (!initialized) {
      if (!googleAuthUrl) {
        loadGoogleAuthUrl();
      }
      if (isShowLogin) {
        loadUser();
      }
      setInitialized(true);
    }
    if (pathname === "/auth/receive") {
      const cookieUrl = Cookies.get(LASTFULLPATH_COOKIE_NAME);
      const redirectUrl = cookieUrl !== "/auth/receive" ? cookieUrl : "/";
      history.push(redirectUrl);
    }
    Cookies.set(LASTFULLPATH_COOKIE_NAME, `${pathname}${search}`);
  });

  return (
    <React.Fragment>
      <Dialog
        fullScreen={false}
        open={isShowLogin}
        // onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Typography variant="h6" id="modal-title">
          Text in a modal
        </Typography>
        <Link href="http://localhost:4000/api/auth/google">
          <Button variant="contained" color="primary">
            Login with Google Passport
          </Button>
        </Link>
        <Link href={googleAuthUrl}>
          <Button variant="contained" color="primary">
            Login with Google
          </Button>
        </Link>
      </Dialog>
      {!isShowLogin && children}
    </React.Fragment>
  );
};

const mapStateToProps = ({ authReducer }, ownProps) => {
  return {
    user: authReducer.user,
    token: authReducer.token,
    googleAuthUrl: authReducer.googleAuthUrl,
    loading: authReducer.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadGoogleAuthUrl: () => dispatch(loadGoogleAuthUrl()),
  loadUser: () => dispatch(loadUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthPage));
