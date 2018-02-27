import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';
import AudioPlayer from './components/AudioPlayer';
import Home from './components/Home'

import { Grid } from 'semantic-ui-react'


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
      }
    }
    return (
      <Grid padded className="App"> 
        <Grid.Row columns={1} >
          <Grid.Column className="App-header">
            Audio Player
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} >
          <Grid.Column>
            <SongList songs={this.props.songs} playSong={this.playSong} />
          </Grid.Column>
          <Grid.Column>
            <Route exact path="/" render={() => 
              <Home msg={'Top Songs...'}/>
            }/>
            <Route path='/:songId' render={(props) => 
              <SongDetails songs={this.props.songs} {...props}/>
            }/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} style={styles.audioPlayer} >
          <Grid.Column>
            <AudioPlayer 
              song={this.props.songs[this.state.currentSong]} 
              totalSongs={this.props.songs.length} 
              isPlaying={this.state.isPlaying}
              changeSong={this.changeSong}
              play={this.play} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default App
