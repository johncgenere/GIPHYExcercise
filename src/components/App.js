import React, {Component} from 'react';
import Gifs from './Gifs';
import axios from 'axios';
import '../styles/App.css';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      defaultSearch: 'Trending',
      search: '',
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

    this.getSearch = this.getSearch.bind(this);
  }

  handleSearchInput = (e) => {
    this.setState({search: e.target.value});
  }

  getSearch = (event) => {
    let search = this.state.search;
    search = search.toString();
    console.log(search);
    console.log('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=mGNzIsuBD7LS9kNIkwTxztRj6jM1N8gB');
    axios.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=mGNzIsuBD7LS9kNIkwTxztRj6jM1N8gB')
      .then(response => {
        let searchResults = response.data.data;
        this.setState({searchResults});
      })
      .catch(err => {
        console.log(err);
      })
  }

  putSearch = () => {
    if(this.state.search !== '')
      return this.state.search;
    return this.state.defaultSearch;
  }

  render(){
    let table = [];

    for(let i = 0; i < this.state.searchResults.length; i++){
      let currImage = this.state.searchResults[i];
      let gif = (currImage.images.original.webp);
      table.push(<Gifs gif={gif} />);
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1> Search GIPHY </h1>
          <div className="ui icon input">
            <input type="text" placeholder="Search..." onChange={this.handleSearchInput}/>
            <i className="inverted circular search link icon" onClick={this.getSearch}></i>
          </div>
          <h1> Currently Searching: {this.putSearch()} </h1>
          {table}
        </header>
      </div>
    );
  }
}

export default App;
