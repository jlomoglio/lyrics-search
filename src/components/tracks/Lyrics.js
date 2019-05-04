import React, { Component } from "react"
import axios from 'axios'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  CORS = 'https://cors-anywhere.herokuapp.com/'
  URL = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?'
  URL2 = 'http://api.musixmatch.com/ws/1.1/track.get?'
  OPTIONS = `track_id=${this.props.match.params.id}`
  KEY = `&apikey=${process.env.REACT_APP_MM_KEY}`

  componentDidMount() {
    axios.get(`${this.CORS}${this.URL}${this.OPTIONS}${this.KEY}`)
      .then(res => {
        console.log(res.data)
        this.setState({ lyrics: res.data.message.body.lyrics })

        return axios.get(`${this.CORS}${this.URL2}${this.OPTIONS}${this.KEY}`)
      })
      .then(res => {
        //console.log(res.data)
        this.setState({ track: res.data.message.body.track })
      })
      .catch(err => console.log(err))
  }

  isLower(input) {
    return (input === input.toLowerCase()) && (input !== input.toUpperCase());
  }

  formatLyrics = (input) => {
    if (!this.isLower(input)) {
      return '<br />' + input
    }
  }

  render() {
    const { track, lyrics } = this.state

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 || 
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />
    }
    else {
      lyrics.lyrics_body = lyrics.lyrics_body.replace(/([A-Z])/g, '<br /> $1').trim()
      lyrics.lyrics_body = lyrics.lyrics_body.substring(0, lyrics.lyrics_body.indexOf('*******'))

      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
          <div className="card">
            <div className="card-header">
              <span className="h4 mb-0">{track.track_name}</span>
              <br />
              <span className="text-secondary">{track.artist_name}</span>
            </div>
            <div className="card-body">
              {
                
            }
              <p dangerouslySetInnerHTML={{ __html: lyrics.lyrics_body}} />
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Lyrics