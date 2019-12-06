import React from 'react'

class Link extends React.Component {
  render() {
    return(
    <button
      onClick={this.props.onClick}
      disabled={this.props.active}
      style={{
        marginLeft: '4px'
      }}
    >
      {this.props.children}
    </button>
    )

  }

}

export default Link
