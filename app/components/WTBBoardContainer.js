import React, { Component } from 'react';
import items from '../../public/items.json';
import WTBBoard from './WTBBoard';
import update from 'react-addons-update';
import moment from 'moment';

class WTBBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      clothingItems: [],
      look: [],
      selectedDate: moment(),
      savedLooks: []
    };
  }

  componentDidMount() {
    this.setState({ clothingItems: items });
    this.setState({ look: [{'name':"barbour", "id": 1, "type": "jacket"},
                           {'name':"gitman", "id": 2, "type": "shirt"},
                           {'name':"levis", "id": 3, "type": "pant"},
                           {'name':"vans", "id": 4, "type": "shoe"}] });
  }

  select(item) {
    let lookIndex = this.state.look.findIndex((piece) => piece.type == item.type);

    let nextState = update(
      this.state.look, {
        [lookIndex]: { $set: item }
      }
    );

    this.setState({look: nextState});
  }

  deselect(item) {
    let lookIndex = this.state.look.findIndex((piece) => piece.type == item.type);

    let nextState = update(
      this.state.look, {
        [lookIndex]: { $set: {"type": item.type } }
      }
    );

    this.setState({look: nextState});

  }

  handleChange(date) {
    this.setState({selectedDate: date});
  }

  render() {
    return (
      <WTBBoard look={this.state.look}
                clothingItems={this.state.clothingItems}
                selectedDate={this.state.selectedDate}
                lookCallbacks={
                                { 
                                  select: this.select.bind(this),
                                  deselect: this.deselect.bind(this),
                                  handleChange: this.handleChange.bind(this)
                                }
                              } />
    )
  }
}

export default WTBBoardContainer;
