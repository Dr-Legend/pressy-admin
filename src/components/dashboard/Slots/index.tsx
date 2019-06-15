import * as React from 'react';
import { Paper, Typography, TextField, NativeSelect, InputLabel, Button, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { styles, inputTheme } from './styles';
import moment from 'moment';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SlotsAction, setSlotStartDate, setSlotTypeDate as setSlotType, createSlot, setDriverCount } from '../../../actions/slots-actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../states/app-state';
import { connect } from 'react-redux';
import { Container } from 'inversify';

type ISlotsProps = {
  classes: any;
  // Properties
  startDate: Date;
  slotType: string;
  isSlotCreatedSnackbarOpen: boolean;
  driverCount: number;
  // Actions
  setSlotStartDate(date: string): void;
  setSlotType(type: string): void;
  setDriverCount(count: number): void;
  createSlot(): void;
}

class SlotsComponent extends React.Component<ISlotsProps> {

  private get dateFormat(): string {
    return "YYYY-MM-DDTHH:mm";
  }

  public render() {
    let { classes, startDate, slotType, driverCount, setDriverCount, setSlotStartDate, setSlotType, createSlot, isSlotCreatedSnackbarOpen } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Typography color="primary" variant="h6">Créer un créneau</Typography>
          <MuiThemeProvider
            theme={inputTheme}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Date et heure"
              className={classes.textField}
              value={moment(startDate).format(this.dateFormat)}
              onChange={(event) => setSlotStartDate(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputLabel shrink className={classes.textField} htmlFor="slot-type-select">Type du créneau</InputLabel>
            <NativeSelect
              fullWidth
              id="slot-type-select"
              value={slotType}
              onChange={(event) => setSlotType(event.target.value)}>
              <option>standard</option>
              <option>express</option>
            </NativeSelect>
            <TextField
              fullWidth
              type="numeric"
              label="Nombre de commandes"
              className={classes.textField}
              value={driverCount}
              onChange={(event) => setDriverCount(Number(event.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MuiThemeProvider>
          <Button
            className={classes.button}
            variant="text"
            color="primary"
            onClick={createSlot}>
            Confirmer
        </Button>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isSlotCreatedSnackbarOpen}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<Typography color="primary">Créneau enregistré</Typography>}
        />
      </div>
    );
  }
  
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, SlotsAction>, ownProps: ISlotsProps): ISlotsProps {
  return {
    ...ownProps,
    setSlotStartDate: startDate => dispatch(setSlotStartDate(startDate)),
    setSlotType: slotType => dispatch(setSlotType(slotType)),
    createSlot: () => dispatch(createSlot()),
    setDriverCount: count => dispatch(setDriverCount(count))
  };
}

function mapStateToProps(state: AppState, ownProperties: ISlotsProps): ISlotsProps {
  let { isSlotCreatedSnackbarOpen, startDate, slotType, driverCount } = state.slots;
  return {
    ...ownProperties,
    startDate,
    slotType,
    isSlotCreatedSnackbarOpen,
    driverCount
  };
}

let Slots = connect(mapStateToProps, mapDispatchToProps)(SlotsComponent);
export default withStyles(styles)(Slots);