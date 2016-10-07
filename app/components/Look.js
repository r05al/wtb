import React, { Component } from 'react';
import ClothingItem from './ClothingItem';

class Look extends Component {
  render() {
    let look = this.props.look.map((item) => {
    	return <ClothingItem key={item.id} {...item} />
    });
    return (
      <div>
        {this.props.title}
        { look }
      </div>
    );
  }
}

export default Look;