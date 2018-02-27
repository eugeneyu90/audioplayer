import React, { Component } from 'react'


class AudioPlayer extends Component {


  render() {
    return (
      <audio controls ref={(self) => {this.audioPlayer = self}}>
          <source src="" />
      </audio>
    )
  }
}

export default AudioPlayer