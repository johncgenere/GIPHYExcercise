import React, {Component} from 'react';
import Gifs from './Gifs';
import axios from 'axios';
import '../styles/App.css';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      search: 'Trending',
      searchResults: {}
    }

    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=mGNzIsuBD7LS9kNIkwTxztRj6jM1N8gB')
      .then(response => {
        let searchResults = response.data.data;
        this.setState({searchResults});
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    let table = [];

    for(let i = 0; i < this.state.searchResults.length; i++){
      let currImage = this.state.searchResults[i];
      let gif = (currImage.images.original.webp);
      console.log(gif);
      table.push(<Gifs gif={gif} />);
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1> Search GIPHY </h1>
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="inverted circular search link icon"></i>
          </div>
          {table}
        </header>
      </div>
    );
  }
}

export default App;
