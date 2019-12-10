import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

class User extends React.Component {

  render() {
    const userId = parseInt(this.props.match.params.id);
    const user = this.props.users[userId];
    return (
      <div>
        <h1>{ user.name }</h1>
        <h3>{ user.gender }</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    users: state
  }
  return props;
  // this.props.users
}

export default withRouter(connect(mapStateToProps)(User));
