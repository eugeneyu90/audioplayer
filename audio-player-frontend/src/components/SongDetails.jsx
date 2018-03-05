import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import jsmediatags from 'jsmediatags'

let albumArt = new Image()
let dataUrl = ''

class SongDetails extends Component {

  // componentDidMount() {
  //   this.getAlbumArt()
  // }

  // componentWillUpdate() {
  //   this.getAlbumArt()
  // }

  // getAlbumArt = () => {
  //   const { songId } = this.props.match.params
  //   const { source, title, description, id } = this.props.songs[songId]
  //   jsmediatags.read('http://localhost:3000'+source, {
  //     onSuccess: function(tag) {
  //       albumArt = tag.tags.picture
  //       let base64String = "";
  //       for (var i = 0; i < albumArt.data.length; i++) {
  //           base64String += String.fromCharCode(albumArt.data[i]);
  //       }
  //       dataUrl = "data:" + albumArt.format + ";base64," + window.btoa(base64String)
  //       albumArt.src = dataUrl
  //     },
  //     onError: function(error) {
  //       console.log(':(', error.type, error.info);
  //     }
  //   })
  // }

  render() {
    const { songId } = this.props.match.params
    const { source, title, description, id } = this.props.songs[songId]
    jsmediatags.read('http://localhost:3000'+source, {
      onSuccess: function(tag) {
        albumArt = tag.tags.picture
        let base64String = "";
        for (var i = 0; i < albumArt.data.length; i++) {
            base64String += String.fromCharCode(albumArt.data[i]);
        }
        dataUrl = "data:" + albumArt.format + ";base64," + window.btoa(base64String)
        albumArt.src = dataUrl
      },
      onError: function(error) {
        console.log(':(', error.type, error.info);
      }
    })


    return (
      <div>
        <div>
          <Icon circular onClick={() => { this.props.playSong(Number(songId))} } name={'play'} size='small' />
          {`${id} - ${title}`}
        </div>
        <img src={albumArt.src} height="150" ref={(self) => {this.albumArt = self}} />
        <div>{description}</div>
        <div>{title}</div>
      </div>
    )
  }
}

export default SongDetails