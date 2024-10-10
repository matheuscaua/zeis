import React from 'react';
import { View, StyleSheet } from 'react-native';

const GRID_SIZE = 400;

const Grid = ({ renderGridLines, children }: any) => {
  return (
    <View style={styles.grid}>
      {renderGridLines()}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    position: 'relative',
    borderColor: 'black',
  },
});

export default Grid;
