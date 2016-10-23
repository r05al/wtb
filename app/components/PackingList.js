import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import NavMenu from './NavMenu';

class PackingList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      startDate: null,
      endDate: null,
      showFilter: false
    }
  }

  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  handleChangeStart(date) {
    if (date && date.isAfter(this.state.endDate)) {
      this.setState({startDate: this.state.endDate});
      this.setState({endDate: date});
    } else {
    this.setState({startDate: date});
    }
  }

  handleChangeEnd(date) {
    if (date && date.isBefore(this.state.startDate)) {
      this.setState({endDate: this.state.startDate});
      this.setState({startDate: date});
    } else {
    this.setState({endDate: date});
    }
  }

  checkItemStatus(item) {
    let itemIndex = this.props.clothingItems.findIndex((piece) => piece.id == item.id);
    return this.props.clothingItems[itemIndex].available;
  }

  render() {

    let getStarted;
    if (!this.setState.startDate && !this.state.endDate){
      getStarted = <p onClick={this.toggleFilter.bind(this)}
                      style={{ cursor: "pointer"}}>
                     <i>Select dates to generate your packing list</i>
                   </p>
    }

    let generatedList, generatedItemList, items = [];
    if (this.state.startDate && this.state.endDate) {
      let startDate = this.state.startDate.startOf('day');
      let endDate = this.state.endDate.endOf('day');
      generatedList = this.props.savedLooks.filter((look) => {
        return look.date.isBetween(startDate, endDate, null, '[]');
      }).reduce((allLooks, look) => {
          let items = Object.keys(look.pieces).filter((item) => Boolean(look.pieces[item].id));
          let itemObjects = items.map((item) => look.pieces[item]);
          itemObjects.forEach((item) => {
            allLooks[item.id] = {"title": item.title, "href": item.href, "available": this.checkItemStatus(item)};
          });
          return allLooks;
      }, {});

      if (Object.keys(generatedList).length) {
        generatedItemList = Object.keys(generatedList).map((item) => {
          return (
            <div key={item} style={{display: "inline", width: "25%" }}>
              <div style={{position: "relative", display: "inline-block", width: "80%"}}>
                <img className="pack-image" src={generatedList[item]["href"]}
                     style={ generatedList[item]["available"] ? {} : { filter: "opacity(50%)" }}/>
                <div style={{position: "absolute", top: "70%"}}>{generatedList[item]["title"]}</div>
                <input type="checkbox" style={{position: "absolute", left: "5px", top: "5px"}} />
              </div>
            </div>
          );
        });
      } else {
        generatedItemList = "No looks found. Create new ones for the days selected.";
      }
    }

    return (
      <section className="app">
        <NavMenu />
        <div id="search" onClick={this.toggleFilter.bind(this)}>&#9740;</div>
        <div className={this.state.showFilter ? "search-options search-options--is-open":"search-options"}>
          <DatePicker
              selected={this.state.startDate}
              placeholderText='Select a start date'
              selectsStart    startDate={this.state.startDate}
              endDate={this.state.endDate}
              isClearable={true}
              onChange={this.handleChangeStart.bind(this)}
              style={{ flex: "1"}} />
          <DatePicker
              selected={this.state.endDate}
              placeholderText='Select a end date'
              selectsEnd    startDate={this.state.startDate}
              endDate={this.state.endDate}
              isClearable={true}
              onChange={this.handleChangeEnd.bind(this)}
              popoverAttachment='bottom center'
              popoverTargetAttachment='top center'
              popoverTargetOffset='10px 60px'
              style={{ flex: "1"}} />
        </div>
        <div className="packing-list">
          <h2><strong>Packing List</strong></h2>
          { getStarted }
          <form style={{display: "flex", flexWrap: "wrap"}}>
            { generatedItemList }
          </form>
        </div>
      </section>
    )
  }
}

PackingList.propTypes = {
  savedLooks: PropTypes.arrayOf(PropTypes.object),
  clothingItems: PropTypes.arrayOf(PropTypes.object)
};

export default PackingList;
