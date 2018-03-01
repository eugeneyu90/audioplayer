import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';
import AudioPlayer from './components/AudioPlayer';
import Home from './components/Home'
import axios from 'axios'
// Semantic UI imports
import { Grid } from 'semantic-ui-react'
import { Menu, Container, Icon } from 'semantic-ui-react'

class App extends Component {
  constructor() {
    super()
    this.state = {
      songs: null,
      currentSong: 0,
      isPlaying: false
    }
  }

  changeSong = (position) => {
    let newSong = this.state.currentSong + position
    const totalSongs = this.state.songs.length
    if(newSong < 0) newSong = totalSongs-1
    if(newSong > totalSongs-1) newSong = 0
    this.setState({
      currentSong: newSong
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

  componentDidMount() {
    axios({
      url: 'http://localhost:8080/songs',
      method: 'GET',
    }).then(res => {
      console.log(res.data)
      this.setState({
        songs: res.data
      })
    })
  }

  render() {

    return ( 
      this.state.songs && (
        <Grid padded > 
          <Grid.Row columns={1} >
            <Grid.Column >
              <Menu fixed='top' inverted>
                <Container>
                  <Menu.Item as='a'>
                    <Icon name='music' />
                    Music Player
                  </Menu.Item>
                </Container>
              </Menu>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} style={{position: 'absolute', top: '40px'}} >
            <Grid.Column >
              <SongList songs={this.state.songs} playSong={this.playSong} />
            </Grid.Column>
            <Grid.Column>
              <Route exact path="/" render={() => 
                <Home msg={'Top Songs...'}/>
              }/>
              <Route path='/:songId' render={(props) => 
                <SongDetails songs={this.state.songs} playSong={this.playSong} {...props}/>
              }/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} >
            <Grid.Column>
              <Menu fixed='bottom' >
                <Container fluid textAlign='center'>
                  <AudioPlayer
                    song={this.state.songs[this.state.currentSong]} 
                    totalSongs={this.state.songs.length} 
                    isPlaying={this.state.isPlaying}
                    changeSong={this.changeSong}
                    play={this.play} />
                </Container>
                </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    )
  }
}

export default App
