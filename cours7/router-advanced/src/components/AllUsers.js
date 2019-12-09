import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

class AllUsers extends React.Component {
  static defaultProps = {
    users: [
      {
        name: 'John Doe',
        picture:
          'https://www.urbanpedaltours.com/wp-content/uploads/2019/04/team.png',
      },
    ],
  };


  render() {
    return (
      <div>
        <GridList cellHeight={180}>
          <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {this.props.users.map((tile, index) => (
            <GridListTile key={index}>
              <img src={tile.picture} alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.name}`}>
                  <Link to={ `/user/${tile.id}` }>
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

const getVisibleUsers = (users, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return users;
    case 'SHOW_MEN':
      return users.filter(u => u.gender === "male");
    case 'SHOW_WOMEN':
      return users.filter(u => u.gender === "female");
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const mapStateToProps = state => ({
  users: getVisibleUsers(state.users, state.visibilityFilter),
});

export default connect(mapStateToProps, null)(AllUsers);
