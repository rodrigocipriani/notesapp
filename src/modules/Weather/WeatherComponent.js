import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Route } from "react-router-dom";
import DataTable from "./DataTable";
import FirebaseService from "../../firebase/FirebaseService";
import { urls, privateUrls } from "./urls";
import Welcome from "./Welcome";
import TopBar from "./TopBar";
import Add from "./Add";
import "./WeatherComponent.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Login from "./Login";
import NavigationLoggedWrapper from "./NavigationLoggedWrapper";
import NavigationWrapper from "./NavigationWrapper";
import { login, logout } from "./actionCreator";

class WeatherComponent extends Component {
  // const [data, setData] = useState(null);

  // let mounted = false;
  // useEffect(() => {
  //   console.log("11111111");
  //   if (!mounted) {
  //     console.log("22222222");
  //     FirebaseService.getDataList("leituras", dataReceived => {
  //       console.log("3333333333", dataReceived);
  //       if (dataReceived !== data) {
  //         console.log("4444444");
  //         setData({ data: dataReceived });
  //       }
  //     });
  //     mounted = true;
  //   }
  // }, [data]);

  state = {
    data: []
  };

  componentDidMount() {
    FirebaseService.getDataList("leituras", dataReceived =>
      this.setState({ data: dataReceived })
    );
    FirebaseService.onAuthChange(
      authUser => this.props.login(authUser),
      () => this.props.logout()
    );
    FirebaseService.getDataList("leituras", dataReceived =>
      this.setState({ data: dataReceived })
    );
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />
        {Object.values(urls).map((url, index) => {
          return (
            <Button
              raised="true"
              key={index}
              component={props => <Link to={url.path} {...props} />}
            >
              {url.name}
            </Button>
          );
        })}
        <Route
          exact
          path={urls.login.path}
          render={props => (
            <NavigationLoggedWrapper component={Login} {...props} />
          )}
        />
        <Route
          exact
          path={urls.home.path}
          render={props => <NavigationWrapper component={Welcome} {...props} />}
        />
        <Route
          exact
          path={urls.data.path}
          render={props => (
            <NavigationWrapper
              component={DataTable}
              {...props}
              data={this.state.data}
            />
          )}
        />
        <Route
          exact
          path={urls.add.path}
          render={props => <NavigationWrapper component={Add} {...props} />}
        />
        <Route
          exact
          path={privateUrls.edit.path}
          render={props => <NavigationWrapper component={Add} {...props} />}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: authUser => dispatch(login(authUser)),
    logout: () => dispatch(logout())
  };
};

const mapStateToProps = state => {
  return { userAuth: state.userAuth };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WeatherComponent);
