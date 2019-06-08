import React, {Component} from 'react';
import Gifs from './Gifs';
import axios from 'axios';
import '../styles/App.css';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      search: '',
      searchResults: {},
      randomSearch: '',
      random: false,
      ratings: {
        y: {},
        g: {},
        pg: {},
        pg13: {},
        r: {}
      },
      selectValue: ''
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
    this.setRatings = this.setRatings.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
    this.onSearchGiphy = this.onSearchGiphy.bind(this); // lets user go back from looking at random gif
  }

  onSearchGiphy = (event) => {
    let selectValue = '';
    let random = false;
    this.setState({selectValue, random});
  }

  handleValueChange = (e) => {
    this.setState({selectValue:e.target.value});
  }

  handleSearchInput = (e) => {
    this.setState({search: e.target.value});
  }

  onEnterSearch  = (event) => {
    if(event.key === 'Enter'){
      let search = this.state.search;
      search = search.toString();
      axios.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=mGNzIsuBD7LS9kNIkwTxztRj6jM1N8gB&limit=24')
        .then(response => {
          let searchResults = response.data.data;
          let random = false;
          let selectValue = '';
          this.setState({searchResults, random, selectValue});
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  getSearch = (event) => {
    let search = this.state.search;
    search = search.toString();
    axios.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=mGNzIsuBD7LS9kNIkwTxztRj6jM1N8gB&limit=24')
      .then(response => {
        let searchResults = response.data.data;
        let random = false;
        let selectValue = '';
        this.setState({searchResults, random, selectValue});
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
    return "Nothing";
  }

  setRatings = () => {
    let allY = [];
    let allG = [];
    let allPG = [];
    let allPG13 = [];
    let allR = [];

    for(let i = 0; i < this.state.searchResults.length; i++){
      let currImage = this.state.searchResults[i];

      switch (currImage.rating) {
        case 'y':
          allY.push(currImage);
          break;
        case 'g':
          allG.push(currImage);
          break;
        case 'pg':
          allPG.push(currImage);
          break;
        case 'pg-13':
          allPG13.push(currImage);
          break;
        case 'r':
          allR.push(currImage);
          break;
        default:
          break;
      }
    }

    let newRatings = {
      y: allY,
      g: allG,
      pg: allPG,
      pg13: allPG13,
      r: allR
    }

    this.setState({ratings: newRatings});
  }

  render(){
    let table = [];

    switch (this.state.selectValue) {
      case 'y':
        let y = this.state.ratings.y;
        for(let i = 0; i < y.length; i++){
          let gif = y[i].images.original.webp;
          table.push(<Gifs gif={gif} />);
        }
        break;
      case 'g':
        let g = this.state.ratings.g;
        for(let i = 0; i < g.length; i++){
          let gif = g[i].images.original.webp;
          table.push(<Gifs gif={gif} />);
        }
        break;
      case 'pg':
        let pg = this.state.ratings.pg;
        for(let i = 0; i < pg.length; i++){
          let gif = pg[i].images.original.webp;
          table.push(<Gifs gif={gif} />);
        }
        break;
      case 'pg13':
        let pg13 = this.state.ratings.pg13;
        for(let i = 0; i < pg13.length; i++){
          let gif = pg13[i].images.original.webp;
          table.push(<Gifs gif={gif} />);
        }
        break;
      case 'r':
        let r = this.state.ratings.r;
        for(let i = 0; i < r.length; i++){
          let gif = r[i].images.original.webp;
          table.push(<Gifs gif={gif} />);
        }
        break;
      default:
        for(let i = 0; i < this.state.searchResults.length; i++){
          let currImage = this.state.searchResults[i];
          let gif = (currImage.images.original.webp);
          table.push(<Gifs gif={gif} />);
        }
    }

    if(this.state.random){
      return(
        <div className="App">
          <header className="App-header">
            <h1 style={{marginTop: '2%'}} onClick={this.onSearchGiphy} id="random"> Search GIPHY </h1>
            <div className="ui icon input" style={{width: '30%', fontSize: '25px'}}>
              <input type="text" placeholder="Search..." onChange={this.handleSearchInput} onKeyPress={this.onEnterSearch}/>
              <i className="inverted circular search link icon" onClick={this.getSearch}></i>
            </div>
            <button className="ui button" onClick={this.getRandom} style={{margin: '1%', width: '30%'}}> Random Gif </button>
            <h1 style={{marginBottom: '3%'}}> Currently Searching: Random Gif </h1>
            <Gifs gif={this.state.randomSearch} />
          </header>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{marginTop: '2%'}}> Search GIPHY </h1>
          <div className="ui icon input" style={{width: '30%', fontSize: '25px'}}>
            <input type="text" placeholder="Search..." onChange={this.handleSearchInput} onKeyPress={this.onEnterSearch}/>
            <i className="inverted circular search link icon" onClick={this.getSearch} style={{width: '5px', height: '25px'}}></i>
          </div>
          <button className="ui button" onClick={this.getRandom} style={{margin: '1%', width: '30%'}}> Random Gif </button>
          <select className="ui dropdown"
                  value={this.state.selectValue}
                  onChange={this.handleValueChange}
                  onClick={this.setRatings}
                  style={{fontSize: '20px', width: '30%', height: '20%', borderRadius: '5px'}}>
            <option value="" style= {{color: 'grey'}}>Select Rating</option>
            <option value="y">Y</option>
            <option value="g">G</option>
            <option value="pg">PG</option>
            <option value="pg13">PG-13</option>
            <option value="r">R</option>
          </select>

          <h1 style={{marginBottom: '3%'}}> Currently Searching: {this.putSearch()} </h1>
          <div className="ui grid container" style={{marginBottom: '3%'}}>
            {table}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
