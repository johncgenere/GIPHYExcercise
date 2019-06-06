import React, {Component} from 'react';

class Gifs extends Component{
  render(){
    return(
      <img className="ui medium rounded image" src={this.props.gif} alt="gif"/>
    );
  }
}

export default Gifs;
