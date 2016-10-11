import React, { Component } from 'react';
import items from '../../public/items.json';
import defaultLook from '../../public/look.json';
import WTBBoard from './WTBBoard';
import update from 'react-addons-update';

class WTBBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      clothingItems: [],
      look: { "pieces": {
                          "jacket" : { type: "jacket"},
                          "shirt" : { type: "shirt"},
                          "pant" : { type: "pant"},
                          "shoe" : { type: "shoe"}
                        },
              "date": null },
      savedLooks: []
    };
  }

  componentDidMount() {
    this.setState({ clothingItems: items });
    this.setState({ look: defaultLook });
  }

  select(item) {

    let nextState = update(
      this.state.look, { 
        pieces: {
          [item.type]: { $set: item }
        }
      }
    );

    this.setState({look: nextState});
  }

  deselect(item) {

    let nextState = update(
      this.state.look, {
        pieces: {
          [item.type]: { 
            $set: {
                    "type": item.type
                  }
          }
        }
      }
    );

    this.setState({look: nextState});

  }

  handleChange(date) {

    let datedLook = update(
      defaultLook, {
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
    
    let lookIndex = this.state.look.pieces.findIndex((piece) => piece.id == item.id);

    if (lookIndex !== -1) {
      this.deselect(this.state.look.pieces[lookIndex]);
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
    if (look.id === "") {
      return false;
    }

    let savedLookIndex = this.state.savedLooks.findIndex((savedLook) => savedLook.id == look.id);

    let nextState = update(this.state.savedLooks, {
                            [savedLookIndex]: { $set: look }
                            });

    this.setState({savedLooks: nextState});
    this.setState({look: look});
  }

  setLook(lookId) {
    if (lookId === "") {
      this.setState({look: defaultLook});
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
