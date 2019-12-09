import React from 'react';
import {withRouter} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {compose} from 'redux';
import { connect } from 'react-redux';

class User extends React.Component {

    render() {
       // console.log(this.props)
        return (
            <Card>
              <CardActionArea>
                <CardMedia
                    image={ this.props.user.picture }
                  title="Profile picture"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                      Name: { this.props.user.name }
                  </Typography>
                </CardContent>
              </CardActionArea>
           </Card>
        )
    }
}


const getUser = (users, ownProps) => {
    const id = parseInt(ownProps.match.params.id);
    const filter = users.filter(u => (u.id === id));
    return filter.length? filter[0] : {name:"", picture:""}
}

const mapStateToProps = (state, ownProps) => ({
    user: getUser(state.users, ownProps)
});

export default withRouter(connect(mapStateToProps)(User));
