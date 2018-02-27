import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Playlist from './components/Playlist';
import SongDetails from './components/SongDetails';
import Home from './components/Home'

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentSong: 0
    }
  }

  changeSong = (position) =>{
    this.setState({
      currentSong: this.state.currentSong + position
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
        <aside>
          <Playlist />
        </aside>
        <Route exact path="/" render={() => 
          <Home msg={'Top Songs...'}/>
        }/>
        <Route path='/:songId' render={(props) => 
          <SongDetails songs={this.props.songs} {...props}/>
        }/>
        <footer style={styles.audioPlayer} >
          <AudioPlayer song={this.props.songs[this.state.currentSong]} totalSongs={this.props.songs.length} changeSong={this.changeSong}/>
        </footer>
      </div>
    )
  }
}

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
    }
  }

  componentDidUpdate() {
    this.audioPlayer.load()
    this.state.isPlaying ? this.audioPlayer.play() : this.audioPlayer.pause()
  }

  play = () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }


  render() {
    const { song, totalSongs } = this.props
    const { source, title, description, id } = song
    console.log(id-1)
    const disablePrev = id-1 < 0 ? true : false
    console.log(disablePrev)
    const disableNext = id+1 > totalSongs-1 ? true : false
    
    return (
      <div>
        <main>
            <span>Now Playing: {title}</span>
        </main>
        <section>
          <button onClick={this.play}>{this.state.isPlaying ? 'Pause' : 'Play'}</button>
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



export default App;
