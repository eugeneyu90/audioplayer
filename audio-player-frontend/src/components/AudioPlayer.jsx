import React, { Component } from 'react'
import { Header, Progress, Icon } from 'semantic-ui-react'

const PADDING = 14
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 4096
const bufferLength = analyser.frequencyBinCount;
// let dataArray = new Float32Array(bufferLength);
let dataArray = new Uint8Array(bufferLength);

const fullWidth = window.innerWidth

class AudioPlayer extends Component {
  constructor() {
    super()
    this.state = {
      currentTime: 0,
      duration: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.song !== this.props.song) { 
      this.audioPlayer.load()
    }
    this.props.isPlaying ? this.audioPlayer.play() : this.audioPlayer.pause()
    // console.log(dataArray)
  }

  updatePlayTime = () => {
    this.setState({
      currentTime: this.audioPlayer.currentTime
    })
    // console.log(this.audioPlayer.currentTime)
  }

  updateDuration = (e) => {
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
    // const disablePrev = id-1 < 0 ? true : false
    // const disableNext = id+1 > totalSongs-1 ? true : false
    return (
      <div style={{width: '100%'}}>
        <Header as='h3' textAlign='center'>
          {title}
        </Header>
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