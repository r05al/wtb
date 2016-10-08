import React, { Component } from 'react';
import items from '../../public/items.json';
import look from '../../public/look.json';
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
    this.setState({ look: look });
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
        [lookIndex]: { $set: {
                                "id": Date.now(),
                                "type": item.type,
                                "title": `Select ${item.type}`
                              } }
      }
    );

    this.setState({look: nextState});

  }

  handleChange(date) {
    this.setState({selectedDate: date});
  }

  addItem(item) {
    let prevState = this.state;

    if (item.id === null) {
      let card = Object.assign({}, card, { id: Date.now() });
    }

    let nextState = update(this.state.clothingItems, { $push: [item] });

    this.setState({clothingItems: nextState});
  }

  updateItem(item) {
    let prevState = this.state;

    let itemIndex = this.state.clothingItems.findIndex((piece) => piece.id == item.id);

    let nextState = update(
                        this.state.clothingItems, {
                          [itemIndex]: { $set: item }
                        });
    
    let lookIndex = this.state.look.findIndex((piece) => piece.id == item.id);

    if (lookIndex !== -1) {
      this.deselect(this.state.look[lookIndex]);
    }

    this.setState({ clothingItems: nextState });
  }

  render() {
    let wtbBoard = this.props.children && React.cloneElement(this.props.children, {
      look: this.state.look,
      clothingItems: this.state.clothingItems,
      selectedDate: this.state.selectedDate,
      lookCallbacks: {
        select: this.select.bind(this),
        deselect: this.deselect.bind(this),
        handleChange: this.handleChange.bind(this)
      },
      itemCallbacks: {
        addItem: this.addItem.bind(this),
        updateItem: this.updateItem.bind(this)
      }
    });

    return wtbBoard;
  }
}

export default WTBBoardContainer;
