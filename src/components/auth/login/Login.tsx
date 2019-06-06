import * as React from 'react';
import { connect } from "react-redux";
import { AuthAction, setEmail as setLoginEmail, setPassword as setLoginPassword, login } from '../../../actions/auth-actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../states/app-state';
import { Container } from 'inversify';
import TextField from "@material-ui/core/TextField";
import { createStyles } from '@material-ui/styles';
import { Theme, withStyles, Button } from '@material-ui/core';

let styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
});

type ILoginProps = {
  classes: any;

  // Actions
  onEmailChanged(value: string): void;
  onPasswordChanged(value: string): void;
  login(): void;
}

class LoginComponent extends React.Component<ILoginProps, any> {

  public render() {
    let { classes, onEmailChanged, onPasswordChanged, login } = this.props;
    return (
      <div>
        <TextField
          id="standard-name"
          label="Email"
          type="email"
          className={classes.textField}
          onChange={event => onEmailChanged(event.target.value)}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Mot de passe"
          type="password"
          className={classes.textField}
          onChange={ event => onPasswordChanged(event.target.value) }
          margin="normal"
        />
        <Button 
          variant="outlined" 
          color="secondary" 
          className={classes.button}
          onClick={() => login()}>
          SE CONNECTER
        </Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, AuthAction>, ownProps: ILoginProps): ILoginProps {
  return {
    ...ownProps,
    onEmailChanged: email => dispatch(setLoginEmail(email)),
    onPasswordChanged: password => dispatch(setLoginPassword(password)),
    login: () => dispatch(login())
  };
}

function mapStateToProps(state: AppState, ownProperties: ILoginProps): ILoginProps {
  return {
    ...ownProperties
  };
}

let Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default withStyles(styles as any)(Login) as any;