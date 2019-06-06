import React, {Component} from 'react';

class Gifs extends Component{
  render(){
    return(
      <div className="four wide column">
        <img className="ui medium rounded image" src={this.props.gif} alt="gif"/>
      </div>
    );
  }
}

export default Gifs;
