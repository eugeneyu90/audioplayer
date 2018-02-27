import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Icon, List } from 'semantic-ui-react'

class SongList extends Component {


  render() {
    const { songs } = this.props
    const songsJSX = songs.map(song => {
      return (
        <List.Item as='a'>
          <Icon name='right triangle' onClick={() => { this.props.playSong(song.id)} } style={{display: 'inline'}}/>
          <Link to={'/' + song.id} >
            <List.Content style={{display: 'inline'}} >
              <List.Header style={{display: 'inline'}} >{song.title}</List.Header>
            </List.Content>
          </Link>
        </List.Item>
      )
    })

    return (
        <List >
          {songsJSX}
        </List>
    )
  }
}

export default SongList