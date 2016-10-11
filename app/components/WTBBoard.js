import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router';
import Look from './Look';
import List from './List';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class WTBBoard extends Component {

  handleSetLook(e) {
    let lookId = e.target.value;
    this.props.lookCallbacks.setLook(lookId);
  }

  render() {

    let addOrUpdateModal = this.props.children && React.cloneElement(this.props.children, {
      clothingItems: this.props.clothingItems,
      look: this.props.look,
      itemCallbacks: this.props.itemCallbacks,
      lookCallbacks: this.props.lookCallbacks
    });

    let datedLooks;
    if (this.props.look.date) {
      let day = this.props.look.date.startOf('day');
      datedLooks = this.props.savedLooks.filter((look) => look.date).filter((look) =>
        look.date.format('L') === this.props.look.date.format('L')
      );
    } else {
      datedLooks = this.props.savedLooks;
    }

    let savedLooksSelection = datedLooks.map((look) => {
      return <option key={look.id} value={look.id}>{look.title}</option>
    });

    return (
      <div className="app">
        <Link to='items/new' className="float-button">+</Link>

        <DatePicker selected={this.props.look.date}
                    isClearable={true}
                    placeholderText='Select a date to filter by'
                    onChange={this.props.lookCallbacks.handleChange } />
        <select id="savedLook"
                value={this.props.look.id}
                onChange={this.handleSetLook.bind(this)}>
          <option value=""></option>
          {savedLooksSelection}
        </select>
        <Link to='packing-list'>Packing List</Link>
        <Look id="look"
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
        { addOrUpdateModal }
      </div>
    )
  }
}

WTBBoard.propTypes = {
  look: PropTypes.object,
  clothingItems: PropTypes.arrayOf(PropTypes.object),
  savedLooks: PropTypes.arrayOf(PropTypes.object),
  lookCallbacks: PropTypes.object,
  itemCallbacks: PropTypes.object
};

export default WTBBoard;
