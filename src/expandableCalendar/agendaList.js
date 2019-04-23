import _ from 'lodash';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  SectionList
} from 'react-native';
import asCalendarConsumer from './asCalendarConsumer';


class AgendaList extends Component {
  static propTypes = {
    ...SectionList.propTypes
  }

  // static defaultProps = {}

  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }

  onViewableItemsChanged = (data) => {
    const {context} = this.props;

    if (data) {
      const topSection = _.get(data.viewableItems[0], 'section.title');
      if (topSection !== this._topSection) {
        this._topSection = topSection;
        // report date change
        if (this.scrolled) { // to avoid setting on first layout
          _.invoke(context, 'setDate', this._topSection);
        }
      }
    }
  }

  onScroll = () => {
    if (!this.scrolled) {
      this.scrolled = true;
    }
  }

  render() {
    return (
      <SectionList
        {...this.props}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 10 //50 means if 50% of the item is visible
        }}
        onScroll={this.onScroll}
      />
    );
  }
}

export default asCalendarConsumer(AgendaList);
