import React, { Component } from 'react'


class Home extends Component {
  render() {
    return (
      <div>
        {this.props.msg}
      </div>
    )
  }
}

export default Home