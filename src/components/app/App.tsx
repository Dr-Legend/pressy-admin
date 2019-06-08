import React, { createContext } from 'react';
import { Container } from "inversify";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from '../../states/app-state';
import { IAction } from '../../actions';
import Login from '../auth/login/Login';
import { initializeAuth } from '../../actions/auth-actions';
import { CircularProgress, createMuiTheme } from '@material-ui/core';
import Dashboard from '../dashboard/Dashboard';
import { MuiThemeProvider, createStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';

let ContainerContext = createContext(null);
let theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500]
    }
  }
});
let styles = createStyles({
  progress: {
    display: "grid",
    placeItems: "center",
    height: "100vh"
  },
  '& a': {
    textDecoration: "none"
  }
});

type IAppProps = {
  classes: any;
  // Props
  container: Container;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  // Actions
  initializeAuth(): void;
}

class AppComponent extends React.Component<IAppProps> {

  public componentWillMount() {
    this.props.initializeAuth();
  }

  public render() {
    let { container, isAuthenticated, isAuthLoading, classes } = this.props;
    return (
      <ContainerContext.Provider
        value={container}>
        <MuiThemeProvider
          theme={theme}>
          {
            isAuthLoading ? 
            <div
              className={classes.progress}>
              <CircularProgress color="secondary" />
            </div> :
            isAuthenticated ?
              <Dashboard /> :
              <Login />
          }
        </MuiThemeProvider>
      </ContainerContext.Provider>
    );

  }

}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, IAction>, ownProps: IAppProps): IAppProps {
  return {
    ...ownProps,
    initializeAuth: () => dispatch(initializeAuth())
  };
}

function mapStateToProps(state: AppState, ownProperties: IAppProps): IAppProps {
  return {
    ...ownProperties,
    isAuthLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated
  };
}

let App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default withStyles(styles)(App) as any;