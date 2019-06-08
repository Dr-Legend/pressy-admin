import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IMemberProfileProps extends RouteComponentProps {

}

class MemberProfileComponent extends React.Component<IMemberProfileProps> {
    
  public render() {
    alert(this.props.match.params);
    return (
      <h1>Member Profile</h1>
    );
  }

}

let MemberProfile = MemberProfileComponent;
export default MemberProfile;