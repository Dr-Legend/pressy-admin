import * as React from 'react';
import { MembersAction, loadMembers, filterMembersWithConstraint } from '../../../actions/members-actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../states/app-state';
import { Container } from 'inversify';
import { connect } from 'react-redux';
import { MemberInfoDto } from '../../../client/model/memberInfoDto';
import { CircularProgress, Table, TableHead, TableRow, TableCell, TableBody, Paper, FormControl, Input, InputAdornment, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles, { inputTheme } from './styles';
import SearchIcon from "@material-ui/icons/Search";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

type IMembersProps = {
  classes: any;
  // 
  isLoading: boolean;
  members?: MemberInfoDto[]
  // Actions
  loadMembers(): void;
  filterMembersWithConstraint(constraint: string): void;
}

class MembersComponent extends React.Component<IMembersProps> {

  public componentWillMount() {
    this.props.loadMembers();
  }

  public render() {
    let { classes, members, isLoading, filterMembersWithConstraint } = this.props;
    return (
      <div>
        {
          isLoading ?
            <div
              className={classes.progress}>
              <CircularProgress color="primary" />
            </div> :
            members && <Paper className={classes.membersPaper}>
              <MuiThemeProvider theme={inputTheme}>
                <FormControl className={classes.searchBar}>
                  <Input
                    className={classes.searchBarInput}
                    placeholder="Chercher ..."
                    onChange={event => filterMembersWithConstraint(event.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </MuiThemeProvider>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">Nom</TableCell>
                    <TableCell align="right">Prénom</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Numéro de téléphone</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    members.map(member => {
                      return (
                        <TableRow key={member.id}>
                          <TableCell component="th" scope="row">
                            {member.id}
                          </TableCell>
                          <TableCell align="right">{member.lastName}</TableCell>
                          <TableCell align="right">{member.firstName}</TableCell>
                          <TableCell align="right">{member.email}</TableCell>
                          <TableCell align="right">{member.phone}</TableCell>
                          <TableCell align="right">
                            <Link
                              className={classes.actionButton}
                              to={`/members/${member.id}`}>
                              <Button
                                variant="text"
                                color="primary">
                                voir
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </Paper>
        }
      </div>
    );
  }

}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, MembersAction>, ownProps: IMembersProps): IMembersProps {
  return {
    ...ownProps,
    loadMembers: () => dispatch(loadMembers()),
    filterMembersWithConstraint: constraint => dispatch(filterMembersWithConstraint(constraint))
  };
}

function mapStateToProps(state: AppState, ownProperties: IMembersProps): IMembersProps {
  let { isLoading, visibleMembers } = state.members;
  return {
    ...ownProperties,
    members: visibleMembers,
    isLoading
  };
}

let Members = connect(mapStateToProps, mapDispatchToProps)(MembersComponent);
export default withStyles(styles)(Members) as any;