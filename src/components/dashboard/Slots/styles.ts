import { Theme, createStyles, createMuiTheme } from "@material-ui/core";

export let inputTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#F59423",
      dark: "#F59423",
      light: "#F59423"
    }
  }
});

export let styles = (theme: Theme) => createStyles({
  paper: {
    width: 900,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    padding: 16
  },
  textField: {
    marginTop: 16
  }, 
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16
  }
});