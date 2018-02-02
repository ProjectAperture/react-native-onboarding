import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tinycolor from 'tinycolor2';

import PageData from './components/PageData';
import Paginator from './components/Paginator';

export default class Onboarding extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
    };
  }

  updatePosition = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const pageFraction = contentOffset.x / layoutMeasurement.width;
    const page = Math.round(pageFraction);
    const isLastPage = this.props.pages.length === page + 1;
    if (isLastPage && pageFraction - page > 0.3) {
      this.props.onEnd();
    } else {
      this.setState({ currentPage: page });
    }
  };

  goNext = () => {
    const { width } = Dimensions.get('window');
    const { currentPage } = this.state;
    const nextPage = currentPage + 1;
    const offsetX = nextPage * width;
    if (this.refs.scroll) {
      this.refs.scroll.scrollTo({ x: offsetX, animated: true });
      this.setState({ currentPage: nextPage });
    }
  };

  scrollTo = (page) => {
    const { width } = Dimensions.get('window');
    const offsetX = page * width;
    if (this.refs.scroll) {
      this.refs.scroll.scrollTo({ x: offsetX, animated: true });
      this.setState({ currentPage: page });
    }
  };

  render() {
    const { width, height } = Dimensions.get('window');
    const { pages, bottomOverlay, showSkip, showNext, showDone } = this.props;
    const currentPage = pages[this.state.currentPage] || pages[0];
    const { backgroundColor } = currentPage;
    const isLight = tinycolor(backgroundColor).getBrightness() > 180;

    return (
      <View style={{ flex: 1, backgroundColor: backgroundColor, justifyContent: 'center' }}>
        <ScrollView
          ref="scroll"
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={this.updatePosition}
          scrollEventThrottle={100}
        >
          {pages.map(({ image, title, disableWhenDone, subtitle, notice, action, isDone, backgroundColor }, idx) => (
            <PageData
              key={idx}
              isLight={isLight}
              isDone={isDone}
              image={image}
              action={action}
              title={title}
              subtitle={subtitle}
              width={width}
              height={height}
              backgroundColor={backgroundColor}
              disableWhenDone={!(disableWhenDone === false)}
              next={this.goNext}
              end={this.props.onEnd}
              currentPage={this.state.currentPage}
              pages={pages}
              notice={notice}
            />
          ))}
        </ScrollView>
        <Paginator
          isLight={isLight}
          overlay={bottomOverlay}
          showSkip={showSkip}
          showNext={showNext}
          showDone={showDone}
          pages={pages}
          currentPage={this.state.currentPage}
          onEnd={this.props.onEnd}
          onNext={this.goNext}
        />
      </View>
    );
  }
}

Onboarding.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    image: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  })).isRequired,
  bottomOverlay: PropTypes.bool,
  showSkip: PropTypes.bool,
  showNext: PropTypes.bool,
  showDone: PropTypes.bool,
};

Onboarding.defaultProps = {
  bottomOverlay: true,
  showSkip: true,
  showNext: true,
  showDone: true,
};
