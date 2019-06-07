import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../states/app-state';
import { Container } from 'inversify';
import { IAction } from '../../actions';
import { connect } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

type IDashboardProps = {
  classes: any;
}

class DashboardComponent extends React.Component<IDashboardProps> {

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Pressy Administration
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, IAction>, ownProps: IDashboardProps): IDashboardProps {
  return {
    ...ownProps,
  };
}

function mapStateToProps(state: AppState, ownProperties: IDashboardProps): IDashboardProps {
  return {
    ...ownProperties
  };
}

let Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
export default withStyles(styles)(Dashboard) as any;