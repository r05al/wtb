import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import Look from './Look';
import List from './List';

import 'react-datepicker/dist/react-datepicker.css';

class WTBBoard extends Component {
  render() {
    return (
      <div className="app">
        <DatePicker selected={this.props.selectedDate}
                    onChange={this.props.lookCallbacks.handleChange } />
        <Look id="look" title="Configure your Look" 
              look={this.props.look}
              lookCallbacks={this.props.lookCallbacks} />
        <div className="selection-items">
          <List id="jacket"
                title="Select a top layer"
                lookCallbacks={this.props.lookCallbacks}
                clothingItems={this.props.clothingItems.filter((item) => item.type === "jacket")} />
          <List id="shirt"
                title="Select a shirt"
                lookCallbacks={this.props.lookCallbacks}
                clothingItems={this.props.clothingItems.filter((item) => item.type === "shirt")} />
          <List id="pants"
                title="Select a pair of pants"
                lookCallbacks={this.props.lookCallbacks}
                clothingItems={this.props.clothingItems.filter((item) => item.type === "pant")} />
          <List id="shoes"
                title="Select shoes"
                lookCallbacks={this.props.lookCallbacks}
                clothingItems={this.props.clothingItems.filter((item) => item.type === "shoe")} />
        </div>
      </div>
    )
  }
}

WTBBoard.propTypes = {
  look: PropTypes.arrayOf(PropTypes.object),
  clothingItems: PropTypes.arrayOf(PropTypes.object),
  lookCallbacks: PropTypes.object
};

export default WTBBoard;
