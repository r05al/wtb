import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router';
import List from './List';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class PackingList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      startDate: null,
      endDate: null,
    }
  }

  handleChangeStart(date) {
    this.setState({startDate: date});
  }

  handleChangeEnd(date) {
    this.setState({endDate: date});
  }

  toggleGenerate() {
    this.setState({showGenerate: this.state.startDate && this.state.endDate});
  }

  getUnique(array) {
    let u = {}, a = [];
    array.forEach((value) => {
      if (u.hasOwnProperty(value)) return;
      a.push(value);
      u[value] = 1;
    });
    return a;
  }

  render() {

    let generatedList, generatedItemList, items = [];
    if (this.state.startDate && this.state.endDate) {
      let startDate = this.state.startDate.startOf('day');
      let endDate = this.state.endDate.endOf('day');
      generatedList = this.props.savedLooks.filter((look) => {
        return look.date.isBetween(startDate, endDate, null, '[]');
      }).reduce((allLooks, look) => {
          let items = Object.keys(look.pieces).filter((item) => Boolean(look.pieces[item].id));
          let itemObjects = items.map((item) => look.pieces[item]);
          itemObjects.forEach((item) => allLooks[item.title] = item.href);
          return allLooks;
      }, {});

      if (Object.keys(generatedList).length) {
        generatedItemList = Object.keys(generatedList).map((item) => {
          return (
            <div key={item} style={{display: "inline"}}>
              <div style={{position: "relative", display: "inline-block", width: "25%"}}>
                <img className="pack-image" src={generatedList[item]} />
                <input type="checkbox" style={{position: "absolute", left: "5px", top: "5px"}} />
              </div>
            </div>
          );
        });
      }
    }

    return (
      <div className="packing-list">
        <Link to='/'>Home</Link>

        <DatePicker
            selected={this.state.startDate}
            selectsStart    startDate={this.state.startDate}
            endDate={this.state.endDate}
            isClearable={true}
            onChange={this.handleChangeStart.bind(this)} />
        <DatePicker
            selected={this.state.endDate}
            selectsEnd    startDate={this.state.startDate}
            endDate={this.state.endDate}
            isClearable={true}
            onChange={this.handleChangeEnd.bind(this)} />
        <h2>Packing List</h2>
        <form>
          { generatedItemList }
        </form>
      </div>
    )
  }
}

PackingList.propTypes = {
  savedLooks: PropTypes.arrayOf(PropTypes.object)
};

export default PackingList;
