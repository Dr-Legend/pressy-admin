import { createStyles, Theme, createMuiTheme } from "@material-ui/core";

export let inputTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#F59423",
      dark: "#F59423",
      light: "#F59423"
    }
  }
});

let styles = (theme: Theme) => createStyles({
  progress: {
    display: "grid",
    placeItems: "center",
    height: "100vh"
  },
  membersPaper: {
    width: 900,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16
  },
  table: {
    minWidth: 650,
  },
  searchBar: {
    width: "100%",
    color: theme.palette.secondary.main
  },
  searchBarInput: {
    margin: 8
  },
  actionButton: {
    textDecoration: "none"
  },
  margin: {
    margin: theme.spacing(1),
  }
});

export default styles;