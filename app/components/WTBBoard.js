import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router';
import NavMenu from './NavMenu';
import Look from './Look';
import List from './List';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class WTBBoard extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showFilter: false,
      showAdd: false
    }
  }

  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter });
  }  

  toggleAdd() {
    this.setState({ showAdd: !this.state.showAdd });
  }

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
        <NavMenu />

        <div id="search" onClick={this.toggleFilter.bind(this)}>&#9740;</div>
        <div className={this.state.showFilter ? "search-options search-options--is-open":"search-options"}>
          <select id="savedLook"
                  value={this.props.look.id}
                  style={{ flex: "1"}}
                  onChange={this.handleSetLook.bind(this)}>
            <option value="">saved looks</option>
            {savedLooksSelection}
          </select>
          <DatePicker selected={this.props.look.date}
                      isClearable={true}
                      placeholderText='Select a date to filter by'
                      popoverAttachment='bottom right'
                      popoverTargetAttachment='top center'
                      popoverTargetOffset='10px 30px'
                      onChange={this.props.lookCallbacks.handleChange } 
                      style={{ flex: "1"}}/>
        </div>

        <div className="float-button"
             onClick={this.toggleAdd.bind(this)}>
          +
          <div className="add-options">
            <Link to='items/new' className={this.state.showAdd ?
            "add-button add-item" : "add-button"}>Item</Link>
            <Link to='looks/new' className={this.state.showAdd ?
            "add-button add-look" : "add-button"}>Look</Link>
          </div>
        </div>


        <Look id="look"
              look={this.props.look}
              lookCallbacks={this.props.lookCallbacks} />
        <div className="selection-lists">
          <List id="jacket"
                lookCallbacks={this.props.lookCallbacks}
                clothingItems={this.props.clothingItems.filter((item) => item.type === "jacket")} />
          <List id="shirt"
                lookCallbacks={this.props.lookCallbacks}
                clothingItems={this.props.clothingItems.filter((item) => item.type === "shirt")} />
          <List id="pants"
                lookCallbacks={this.props.lookCallbacks}
                clothingItems={this.props.clothingItems.filter((item) => item.type === "pant")} />
          <List id="shoes"
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
