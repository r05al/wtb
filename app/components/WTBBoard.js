import React, { Component, PropTypes } from 'react';
import Look from './Look';
import List from './List';

class WTBBoard extends Component {
  render() {
    return (
      <div className="app">
        <Look id="look" title="Configure your Look" look={this.props.look} />
        <List id="jacket"
              title="Select a top layer"
              clothingItems={this.props.clothingItems.filter((item) => item.type === "jacket")} />
        <List id="shirt"
              title="Select a shirt"
              clothingItems={this.props.clothingItems.filter((item) => item.type === "shirt")} />
        <List id="pants"
              title="Select a pair of pants"
              clothingItems={this.props.clothingItems.filter((item) => item.type === "pant")} />
        <List id="shoes"
              title="Select shoes"
              clothingItems={this.props.clothingItems.filter((item) => item.type === "shoe")} />
      </div>
    )
  }
}

WTBBoard.propTypes = {
  look: PropTypes.arrayOf(PropTypes.object),
  clothingItems: PropTypes.arrayOf(PropTypes.object)
};

export default WTBBoard;
