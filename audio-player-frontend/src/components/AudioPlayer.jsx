import React, { Component } from 'react'
import { Header, Progress, Icon } from 'semantic-ui-react'
import jsmediatags from 'jsmediatags'

const PADDING = 14
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 4096
const bufferLength = analyser.frequencyBinCount;
// let dataArray = new Float32Array(bufferLength);
let dataArray = new Uint8Array(bufferLength);
const fullWidth = window.innerWidth
let albumArt = new Image()
let dataUrl = ''
// Simple API - will fetch all tags
// var jsmediatags = require("jsmediatags");

class AudioPlayer extends Component {
  constructor() {
    super()
    this.state = {
      currentTime: 0,
      duration: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // jsmediatags.read('http://localhost:3000/audiobook1.mp3', {
    jsmediatags.read('http://localhost:3000'+this.props.song.source, {
      onSuccess: function(tag) {
        // console.log(tag)
        // console.log(tag.tags.picture)
        albumArt = tag.tags.picture
        let base64String = "";
        for (var i = 0; i < albumArt.data.length; i++) {
            base64String += String.fromCharCode(albumArt.data[i]);
        }
        dataUrl = "data:" + albumArt.format + ";base64," + window.btoa(base64String);
        albumArt.src = dataUrl
      },
      onError: function(error) {
        console.log(':(', error.type, error.info);
      }
    })
    if (prevProps.song !== this.props.song) { 
      this.audioPlayer.load()
      // jsmediatags.read('http://localhost:3000'+this.props.song.source , {

    }
    this.props.isPlaying ? this.audioPlayer.play() : this.audioPlayer.pause()
  }

  updatePlayTime = () => {
    this.setState({
      currentTime: this.audioPlayer.currentTime
    })
  }

  updateDuration = (e) => {
    console.log(this.props.song.source)

    
    this.setState({
      duration: e.target.duration
    })

  }
  
  play = () => {
    this.props.play()
    this.draw()
  }

  seek = (event) => {
    console.log(event.clientX)
    console.log(window.innerWidth)
    let seekedTime = parseFloat(event.clientX / window.innerWidth) * this.state.duration
    console.log(seekedTime)
    this.audioPlayer.currentTime = seekedTime
  }

  componentDidMount() {
    jsmediatags.read('http://localhost:3000'+this.props.song.source, {
      onSuccess: function(tag) {
        // console.log(tag)
        // console.log(tag.tags.picture)
        albumArt = tag.tags.picture
        let base64String = "";
        for (var i = 0; i < albumArt.data.length; i++) {
            base64String += String.fromCharCode(albumArt.data[i]);
        }
        dataUrl = "data:" + albumArt.format + ";base64," + window.btoa(base64String);
        albumArt.src = dataUrl
      },
      onError: function(error) {
        console.log(':(', error.type, error.info);
      }
    })
    let source = audioCtx.createMediaElementSource(this.audioPlayer);
    let gainNode = audioCtx.createGain()

    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioCtx.destination);
  }

  draw = () => {
    //https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
    const HEIGHT = 200
    const WIDTH = 350

    let canvasCtx = this.canvas.getContext('2d');
    let drawVisual = requestAnimationFrame(this.draw);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();
    
    let sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;
    let silence = new Uint8Array(bufferLength);
    for(var i = 0; i < (bufferLength); i++) {
      var v = dataArray[i] / (bufferLength);
      var y = v * HEIGHT/2;
      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    canvasCtx.lineTo(this.canvas.width, this.canvas.height/2);
    canvasCtx.stroke();
      
  }

  render() {
    const { song, totalSongs, changeSong, isPlaying } = this.props
    const { source, title, description, id } = song

    return (
      <div id="playerContainer" ref={(self) => {this.playerContainer = self}} style={{width: '100%'}}>
        <Header as='h3' textAlign='center'>
          {title}
        </Header>

        {/* {albumArt} */}
        <div style={{float: 'left', position: 'absolute', left: '10px', top: '10px'}}>
          <img src={albumArt.src} height="70" ref={(self) => {this.albumArt = self}} />
        </div>
        <canvas height='20px' ref={(self) => {this.canvas = self}}></canvas>
        <section>
          <Icon circular onClick={() => { changeSong(-1)}} name='step backward' size='large' />
          <Icon circular onClick={this.play} name={isPlaying ? 'pause' : 'play'} size='large' />
          <Icon circular onClick={() => { changeSong(1)}} name='step forward' size='large' />
        </section>
        <audio 
          ref={(self) => {this.audioPlayer = self}}
          onTimeUpdate={this.updatePlayTime} 
          onLoadedMetadata={this.updateDuration}
        >
          <source src={source} />
        </audio>
        <Progress 
          active
          color='blue'
          // precision={2}
          // progress='ratio'
          // label={title}
          size='tiny'
          style={{ marginBottom: '5px', marginTop: '5px' }}
          value={this.state.currentTime}
          total={this.state.duration} 
          onClick={(event) => {this.seek(event)}}
          />
      </div>
    )
  }
}

export default AudioPlayer