import React, { Component } from 'react';
import items from '../../public/items.json';
import WTBBoard from './WTBBoard';

class WTBBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      clothingItems: [],
      look: []
    };
  }

  componentDidMount() {
    this.setState({ clothingItems: items });
    this.setState({ look: [{'name':"barbour", "id": 1},{'name':"gitman", "id": 2},
                           {'name':"levis", "id": 3},{'name':"vans", "id": 4}] });
  }

  render() {
    return (
      <WTBBoard look={this.state.look}
                clothingItems={this.state.clothingItems} />
    )
  }
}

export default WTBBoardContainer;
