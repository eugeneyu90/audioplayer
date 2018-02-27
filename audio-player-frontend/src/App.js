import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';
import AudioPlayer from './components/AudioPlayer';
import Home from './components/Home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentSong: 0,
      isPlaying: false
    }
  }

  changeSong = (position) => {
    this.setState({
      currentSong: this.state.currentSong + position
    })
  }

  playSong = (songId) => {
    this.setState({
      currentSong: songId,
      isPlaying: true
    })
  }

  play = () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }


  render() {
    const styles={
      audioPlayer: {
        position: 'absolute',
        bottom: 0,
        height: '30vh',
        width: '100%'
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          Audio Player
        </header>
        <section>
          <SongList songs={this.props.songs} playSong={this.playSong} />
        </section>
        <Route exact path="/" render={() => 
          <Home msg={'Top Songs...'}/>
        }/>
        <Route path='/:songId' render={(props) => 
          <SongDetails songs={this.props.songs} {...props}/>
        }/>
        <footer style={styles.audioPlayer} >
          <AudioPlayer 
            song={this.props.songs[this.state.currentSong]} 
            totalSongs={this.props.songs.length} 
            isPlaying={this.state.isPlaying}
            changeSong={this.changeSong}
            play={this.play} />
        </footer>
      </div>
    )
  }
}

export default App
