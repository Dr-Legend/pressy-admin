import { createStyles, Theme, createMuiTheme } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

export let inputTheme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
      dark: orange[500],
      light: orange[500]
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
  }
});

export default styles;