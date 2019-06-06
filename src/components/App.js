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
      searchResults: {},
      randomSearch: '',
      random: false
    }

    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=mGNzIsuBD7LS9kNIkwTxztRj6jM1N8gB&limit=24')
      .then(response => {
        let searchResults = response.data.data;
        this.setState({searchResults});
      })
      .catch(err => {
        console.log(err);
      })

    this.getSearch = this.getSearch.bind(this);
    this.getRandom = this.getRandom.bind(this);
  }

  handleSearchInput = (e) => {
    this.setState({search: e.target.value});
  }

  getSearch = (event) => {
    let search = this.state.search;
    search = search.toString();
    axios.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=mGNzIsuBD7LS9kNIkwTxztRj6jM1N8gB&limit=24')
      .then(response => {
        let searchResults = response.data.data;
        let random = false;
        this.setState({searchResults, random});
      })
      .catch(err => {
        console.log(err);
      })
  }

  getRandom = (event) => {
    axios.get('http://api.giphy.com/v1/gifs/random?api_key=mGNzIsuBD7LS9kNIkwTxztRj6jM1N8gB')
      .then(response => {
        let randomSearch = response.data.data.images.original.webp;
        let random = true;
        this.setState({randomSearch, random});
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

    if(this.state.random){
      return(
        <div className="App">
          <header className="App-header">
            <h1> Search GIPHY </h1>
            <div className="ui icon input">
              <input type="text" placeholder="Search..." onChange={this.handleSearchInput}/>
              <i className="inverted circular search link icon" onClick={this.getSearch}></i>
            </div>
            <button className="ui button" onClick={this.getRandom}> Random Gif </button>
            <h1> Currently Searching: Random Gif </h1>
            <Gifs gif={this.state.randomSearch} />
          </header>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1> Search GIPHY </h1>
          <div className="ui icon input">
            <input type="text" placeholder="Search..." onChange={this.handleSearchInput}/>
            <i className="inverted circular search link icon" onClick={this.getSearch}></i>
          </div>
          <button className="ui button" onClick={this.getRandom}> Random Gif </button>
          <h1> Currently Searching (Press The Search Icon to Begin Search): {this.putSearch()} </h1>
          <div className="ui grid container" style={{marginBottom: '3%'}}>
            {table}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
