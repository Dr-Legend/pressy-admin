import { Theme, createStyles } from "@material-ui/core";

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

export default styles;