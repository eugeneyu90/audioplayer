import React, { Component } from 'react'


class AudioPlayer extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.song !== this.props.song) this.audioPlayer.load()
    this.props.isPlaying ? this.audioPlayer.play() : this.audioPlayer.pause()
  }

  play = () => {
    this.props.play()
  }

  render() {
    const { song, totalSongs } = this.props
    const { source, title, description, id } = song
    const disablePrev = id-1 < 0 ? true : false
    const disableNext = id+1 > totalSongs-1 ? true : false
    
    return (
      <div>
        <main>
            <span>Now Playing: {title}</span>
        </main>
        <section>
          <button onClick={this.play}>{this.props.isPlaying ? 'Pause' : 'Play'}</button>
        </section>
        <section>
          <button disabled={disablePrev} onClick={() => { this.props.changeSong(-1)}}>Prev Song</button>
          <button disabled={disableNext} onClick={() => { this.props.changeSong(1)}}>Next Song</button>
        </section>
        <audio controls ref={(self) => {this.audioPlayer = self}}>
            <source src={source} />
        </audio>
      </div>
    )
  }
}

export default AudioPlayer