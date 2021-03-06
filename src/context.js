import React, { Component } from "react"
import axios from 'axios'

const Context = React.createContext()

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks'
  }

  CORS = 'https://cors-anywhere.herokuapp.com/'
  URL = 'http://api.musixmatch.com/ws/1.1/chart.tracks.get?'
  OPTIONS = 'page=1&page_size=10&country=us&f_has_lyrics=1'
  KEY = `&apikey=${process.env.REACT_APP_MM_KEY}`

  componentDidMount() {
    axios.get(`${this.CORS}${this.URL}${this.OPTIONS}${this.KEY}`)
      .then(res => {
        //console.log(res.data)
        this.setState({ track_list: res.data.message.body.track_list })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        { this.props.children }
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer