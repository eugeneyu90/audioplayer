import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'

class App extends Component {
  
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

        <footer style={styles.audioPlayer} >
          <AudioPlayer />
        </footer>
      </div>
    );
  }
}

class AudioPlayer extends Component {


  render() {
    return (
      <div>
        <button onClick={() => this.audioPlayer.play()}>Play</button>
        <button onClick={() => this.audioPlayer.pause()}>Pause</button>
        <audio controls ref={(self) => {this.audioPlayer = self}}>
            <source src="" />
        </audio>
      </div>
    )
  }
}



export default App;
