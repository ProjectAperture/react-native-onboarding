import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';

const PageCheckmark = ({ isLight, selected }) => (
  <Text
    style={{
      ...styles.element,
      ...styles.elementCheck,
      color: isLight ? (selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)') : (selected ? '#fff' : 'rgba(255, 255, 255, 0.5)')
    }}>
    <MaterialIcon name='check' size={12} />
  </Text>
);

const PageDot = ({ isLight, selected }) => (
  <View
    style={{
      ...styles.element,
      ...styles.elementDot,
      backgroundColor: isLight ? (selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)') : (selected ? '#fff' : 'rgba(255, 255, 255, 0.5)')
    }}
  />
);

const PageDots = ({ isLight, pages, currentPage }) => (
  <View style={styles.container}>
    {pages.map((page, index) => (
      page.isDone() ?
      <PageCheckmark key={index} selected={index === currentPage} isLight={isLight} /> :
      <PageDot key={index} selected={index === currentPage} isLight={isLight} />
    ))}
  </View>
);

const styles = {
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  element: {
    marginHorizontal: 3,
  },
  elementCheck:  {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '900',
  },
  elementDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
};

export default PageDots;
