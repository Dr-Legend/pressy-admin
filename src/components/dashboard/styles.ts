import { createStyles, Theme } from "@material-ui/core";

let styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 16,
  },
  title: {
    marginRight: 36,
    marginLeft: 36,
    color: theme.palette.primary.contrastText,
    textDecoration: "none"
  },
  logoLink: {
    textDecoration: "none"
  },
  appbarButton: {
    marginLeft: 8, 
    marginRight: 8
  },
  appbarButtonTitle: {
    textDecoration: "none"
  }
});

export default styles;