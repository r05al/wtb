import React, { Component } from 'react';
import WTBBoard from './WTBBoard';
import update from 'react-addons-update';
import 'whatwg-fetch';

const API_URL = 'https://398eprc7a0.execute-api.us-west-2.amazonaws.com/test/wearto-data';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'stuff'
};

class WTBBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      clothingItems: [],
      defaultLook: {},
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
    fetch(API_URL + '/initialData.json', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({defaultLook: responseData["defaultLook"]});
      this.setState({look: responseData["defaultLook"]});
      this.setState({clothingItems: responseData["items"]});
    })
    .catch((error) => {
      console.log('Error in fetching and parsing data', error);
    });
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
      this.state.defaultLook, {
        date: { $set: date }
      }
    );

    this.setState({look: datedLook})
  }

  addItem(item) {
    let prevState = this.state;

    if (item.href === undefined) {
      item = Object.assign({}, item, { href: "http://placehold.it/455x475" });
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
    
    for(let piece of Object.keys(this.state.look.pieces)) {
      if (this.state.look.pieces[piece] &&
        item.id === this.state.look.pieces[piece].id) {
        this.deselect(this.state.look.pieces[piece]);
      }
    }

    this.setState({ clothingItems: nextState });
  }

  toggleItem(item) {
    let prevState = this.state;

    let itemIndex = this.state.clothingItems.findIndex((piece) => piece.id == item.id);

    let nextState = update(
                        this.state.clothingItems, {
                          [itemIndex]: {
                            available: {
                              $set: !item.available
                            }
                          }
                        });

    this.setState({ clothingItems: nextState });
  }

  addLook(look) {
    let prevState = this.state;

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
      this.setState({look: this.state.defaultLook});
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
      lookCallbacks: {
        select: this.select.bind(this),
        deselect: this.deselect.bind(this),
        handleChange: this.handleChange.bind(this),
        addLook: this.addLook.bind(this),
        updateLook: this.updateLook.bind(this),
        setLook: this.setLook.bind(this),
        toggleItem: this.toggleItem.bind(this)
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
