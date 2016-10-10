import React, { Component } from 'react';
import items from '../../public/items.json';
import look from '../../public/look.json';
import WTBBoard from './WTBBoard';
import update from 'react-addons-update';

class WTBBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      clothingItems: [],
      look: { "pieces": [], "date": null },
      savedLooks: []
    };
  }

  componentDidMount() {
    this.setState({ clothingItems: items });
    this.setState({ look: look });
  }

  select(item) {
    let pieceIndex = this.state.look.pieces.findIndex((piece) => piece.type == item.type);

    let nextState = update(
      this.state.look, { 
        pieces: { 
          [pieceIndex]: { $set: item }
        }
      }
    );

    this.setState({look: nextState});
  }

  deselect(item) {
    let pieceIndex = this.state.look.pieces.findIndex((piece) => piece.type == item.type);

    let nextState = update(
      this.state.look, {
        pieces: {
          [pieceIndex]: { 
            $set: {
                    "id": Date.now(),
                    "type": item.type,
                    "title": `Select ${item.type}`
                  }
          }
        }
      }
    );

    this.setState({look: nextState});

  }

  handleChange(date) {

    let datedLook = update(
      look, {
        date: { $set: date }
      }
    );

    this.setState({look: datedLook})
  }

  addItem(item) {
    let prevState = this.state;

    if (item.id === null) {
      let item = Object.assign({}, item, { id: Date.now() });
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

  addLook(look) {
    let prevState = this.state;

    if (look.id === null) {
      let look = Object.assign({}, look, { id: Date.now() });
    }

    let nextState = update(this.state.savedLooks, { $push: [look] });

    this.setState({savedLooks: nextState});
    this.setState({look: look});
  }

  updateLook(look) {

  }

  setLook(lookId) {
    if (lookId === "null") {
      this.setState({look: look});
      return false;
    }
    let lookIndex = this.state.savedLooks.findIndex((look) => look.id == lookId);

    this.setState({ look: this.state.savedLooks[lookIndex]});
  }

  render() {
    let wtbBoard = this.props.children && React.cloneElement(this.props.children, {
      look: this.state.look,
      clothingItems: this.state.clothingItems,
      savedLooks: this.state.savedLooks,
      selectedDate: this.state.selectedDate,
      lookCallbacks: {
        select: this.select.bind(this),
        deselect: this.deselect.bind(this),
        handleChange: this.handleChange.bind(this),
        addLook: this.addLook.bind(this),
        updateLook: this.updateLook.bind(this),
        setLook: this.setLook.bind(this)
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
