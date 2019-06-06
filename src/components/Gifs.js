import React, {Component} from 'react';

class Gifs extends Component{
  render(){
    console.log('gif link is', this.props.gif);
    return(
      <img className="ui medium rounded image" src={this.props.gif} alt="gif"/>
    );
  }
}

export default Gifs;
