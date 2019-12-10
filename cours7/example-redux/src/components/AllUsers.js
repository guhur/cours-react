import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


class AllUsers extends React.Component {

  render() {
    return (
      <div>
        <GridList cellHeight={180}>
          <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div">All Users</ListSubheader>
          </GridListTile>
          {this.props.users.map((user, index) => (
            <GridListTile key={index}>
              <img src={user.picture} alt={user.name} />
              <GridListTileBar
                title={user.name}
                actionIcon={
                  <IconButton aria-label={`info about ${user.name}`}>
                    <Link to={`/user/${user.id}`}>
                      <InfoIcon />
                    </Link>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
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

export default connect(mapStateToProps, null)(AllUsers);
