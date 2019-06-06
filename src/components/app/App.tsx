import React, { createContext } from 'react';
import './App.css';
import { Container } from "inversify";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from '../../states/app-state';
import { IAction } from '../../actions';
import Login from '../auth/login/Login';
import { initializeAuth } from '../../actions/auth-actions';
import { CircularProgress } from '@material-ui/core';

let ContainerContext = createContext(null);

type IAppProps = {
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
    let { container, isAuthenticated, isAuthLoading } = this.props;
    return (
      <ContainerContext.Provider
        value={container}>
        {
          isAuthLoading && <CircularProgress color="secondary"/>
        }
        {
          isAuthenticated ?
          <div>
            Authenticated
          </div> :
          <Login />
        }
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
export default App as any;