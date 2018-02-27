import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Grid, Icon, List } from 'semantic-ui-react'

class SongList extends Component {


  render() {
    const { songs } = this.props
    const songsJSX = songs.map(song => {
      return (
        <List.Item>
          <Grid columns={2} divided={true} relaxed={false} style={{marginTop: 0, marginBottom: 0}}> 
            <Grid.Row style={{paddingTop: 0, paddingBottom: 0}}>
              <Grid.Column>
                <Icon name='right triangle' onClick={() => { this.props.playSong(song.id)} }/>
              </Grid.Column>
              <Grid.Column style={{backgroundColor: 'grey'}}>
                <Link to={'/' + song.id} >
                  <List.Content >
                    <List.Header  >{song.title}</List.Header>
                  </List.Content>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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