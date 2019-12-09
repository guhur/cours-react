import React from 'react';
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { setVisibilityFilter } from '../actions'

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.checked}
                onChange={this.props.onClick}
                value="checked"
                color="primary"
              />
            }
            label={this.props.checked ? 'men' : 'women'}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

function onClick(e) {
    const filter = e.target.checked? 'SHOW_MEN': 'SHOW_WOMEN';
    return setVisibilityFilter(filter);
}

const mapStateToProps = state => ({
  checked: 'SHOW_MEN' === state.visibilityFilter
})

const mapDispatchToProps = dispatch => ({
  onClick: (e) => dispatch(onClick(e))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
