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
    flexGrow: 1,
  },
});

export default styles;