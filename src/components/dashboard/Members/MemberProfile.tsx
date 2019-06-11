import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../states/app-state';
import { Container } from 'inversify';
import { IAction } from '../../../actions';
import { connect } from 'react-redux';
import { loadMemberProfile } from '../../../actions/members-actions/selected-member-actions';
import { MemberInfoDto } from '../../../client/model/memberInfoDto';
import { CircularProgress, withStyles, Paper, FormControl, InputLabel, Input, Grid, Typography, Divider } from '@material-ui/core';
import styles, { inputTheme } from './styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { OrderDto } from '../../../client/model/orderDto';

interface IMemberProfileProps extends RouteComponentProps<{id: string}> {
  classes: any;
  // 
  isLoading: boolean;
  member?: MemberInfoDto;
  memberOrders?: OrderDto[];
  // Actions
  loadMemberProfile(id: string): void;
}

class MemberProfileComponent extends React.Component<IMemberProfileProps> {

  public componentDidMount() {
    this.props.loadMemberProfile(this.props.match.params.id);
  }
    
  public render() {
    let { isLoading, member, classes } = this.props;
    return (
      <div>
        {
          isLoading ? 
            <div
              className={classes.progress}>
              <CircularProgress color="primary" />
            </div> :
            member && <Paper className={classes.membersPaper}>
              <MuiThemeProvider theme={inputTheme}>
                <Typography color="primary" variant="h6" className={classes.margin}>
                  Informations du membre
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.margin}>
                      <InputLabel htmlFor="last-name">Nom</InputLabel>
                      <Input
                        contentEditable={false}
                        id="last-name"
                        value={member.lastName}/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="first-name">Prénom</InputLabel>
                    <Input
                      contentEditable={false}
                      id="first-name"
                      value={member.firstName}/>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth className={classes.margin}>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input
                        contentEditable={false}
                        id="email"
                        value={member.email}/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth className={classes.margin}>
                      <InputLabel htmlFor="phone">Numéro de téléphone</InputLabel>
                      <Input
                        contentEditable={false}
                        id="phone"
                        value={member.phone}/>
                    </FormControl>
                  </Grid>
                </Grid>
                <Typography color="primary" variant="h6" className={classes.margin}>
                  Adresses du membre
                </Typography>
                {
                  member.addresses.map((address, index) => {
                    return <Grid container justify="space-around" spacing={3}>
                      <Grid item xs={5}>
                        <FormControl fullWidth className={classes.margin}>
                          <InputLabel htmlFor="street-name">Nom de la rue, avenue ...</InputLabel>
                          <Input
                            contentEditable={false}
                            id="street-name"
                            value={address.streetName} />
                        </FormControl>
                      </Grid>
                      <Grid item xs={5}>
                        <FormControl fullWidth className={classes.margin}>
                          <InputLabel htmlFor="street-number">Numéro</InputLabel>
                          <Input
                            contentEditable={false}
                            id="street-number"
                            value={address.streetNumber} />
                        </FormControl>
                      </Grid>
                      <Grid item xs={5}>
                        <FormControl fullWidth className={classes.margin}>
                          <InputLabel htmlFor="zipcode">Code postale</InputLabel>
                          <Input
                            contentEditable={false}
                            id="zipcode"
                            value={address.zipCode} />
                        </FormControl>
                      </Grid>
                      <Grid item xs={5}>
                        <FormControl fullWidth className={classes.margin}>
                          <InputLabel htmlFor="city">Ville</InputLabel>
                          <Input
                            contentEditable={false}
                            id="city"
                            value={address.city} />
                        </FormControl>
                      </Grid>
                      {
                        index < member.addresses.length - 1 &&
                        <Grid item key={address.id} xs={11}>
                          <FormControl fullWidth className={classes.margin}>
                            <Divider />
                          </FormControl>
                        </Grid>
                      }
                    </Grid>
                  })
                }
              </MuiThemeProvider>
            </Paper>
        }
      </div>
    );
  }

}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, IAction>, ownProps: IMemberProfileProps): IMemberProfileProps {
  return {
    ...ownProps,
    loadMemberProfile: id => dispatch(loadMemberProfile(id))
  };
}

function mapStateToProps(state: AppState, ownProperties: IMemberProfileProps): IMemberProfileProps {
  let { isLoading, selectedMember } = state.members.selectedMemberState;
  return {
    ...ownProperties,
    isLoading,
    member: selectedMember 
  };
}

let MemberProfile = connect(mapStateToProps, mapDispatchToProps)(MemberProfileComponent);
export default withStyles(styles)(MemberProfile) as any;