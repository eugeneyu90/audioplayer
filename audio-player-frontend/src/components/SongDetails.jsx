import React, { Component } from 'react'


class SongDetails extends Component {

  render() {
    const { songId } = this.props.match.params
    const { source, title, description, id } = this.props.songs[songId]
    return (
      <div>
        <div>
          <button onClick={() => { this.props.playSong(Number(songId))} }>Play</button>
          {`${id} - ${title}`}
        </div>
        <div>{description}</div>
        <div>{title}</div>
      </div>
    )
  }
}

export default SongDetails