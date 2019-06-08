import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../states/app-state';
import { Container } from 'inversify';
import { IAction } from '../../actions';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { Link, Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Drivers from './Drivers';
import Orders from './Orders';
import Members from './Members';
import Articles from './Articles';
import MemberProfile from './Members/MemberProfile';
import Slots from './Slots';
import { logout } from '../../actions/auth-actions/login-actions';

type IDashboardState = {
  dropDownOpen: boolean;
}

type IDashboardProps = {
  classes: any;
  logout(): void;
}

class DashboardComponent extends React.Component<IDashboardProps, IDashboardState> {

  constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      dropDownOpen: false
    };
  }

  public render() {
    let { classes, logout } = this.props;
    return (
      <Router
        history={createBrowserHistory()}>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Link 
                className={classes.logoLink}
                to="/">
                <Typography variant="h6" className={classes.title}>
                  Pressy Admin
                </Typography>
              </Link>
              <Link
                className={classes.appbarButtonTitle}
                to="/members">
                <Button
                  className={classes.appbarButton}
                  variant="text"
                  color="primary">
                  Membres
                </Button>
              </Link>
              <Link
                className={classes.appbarButtonTitle}
                to="/orders">
                <Button
                  className={classes.appbarButton}
                  variant="text"
                  color="primary">
                  Commandes
                </Button>
              </Link>
              <Link
                className={classes.appbarButtonTitle} 
                to="/drivers">
                <Button
                  className={classes.appbarButton}
                  variant="text"
                  color="primary">
                  Chauffeurs
                </Button>
              </Link>
              <Link
                className={classes.appbarButtonTitle}
                to="/articles">
                <Button
                  className={classes.appbarButton}
                  variant="text"
                  color="primary">
                  Articles &#38; Tarification 
                </Button>
              </Link>
              <Link
                className={classes.appbarButtonTitle}
                to="/slots">
                <Button
                  className={classes.appbarButton}
                  variant="text"
                  color="primary">
                  Créneaux
                </Button>
              </Link>
              <div className={classes.space}></div>
              <Button
                className={classes.appbarButton}
                variant="text"
                color="primary"
                onClick={logout}>
                Se déconnecter
              </Button>
            </Toolbar>
          </AppBar>
          <Route exact component={Slots} path="/slots" />
          <Route exact component={Drivers} path="/drivers" />
          <Route exact component={Orders} path="/orders" />
          <Route exact component={Members} path="/members" />
          <Route component={MemberProfile} path="/members/:id" />
          <Route exact component={Articles} path="/articles" />
        </div>
      </Router>
    );
  }

}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, IAction>, ownProps: IDashboardProps): IDashboardProps {
  return {
    ...ownProps,
    logout: () => dispatch(logout())
  };
}

function mapStateToProps(state: AppState, ownProperties: IDashboardProps): IDashboardProps {
  return {
    ...ownProperties
  };
}

let Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
export default withStyles(styles)(Dashboard) as any;