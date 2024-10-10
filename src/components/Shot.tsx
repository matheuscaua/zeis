import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ShotProps {
  x: number;
  y: number;
}

const Shot = ({ x, y }: ShotProps) => {
  return (
    <View
      style={[
        styles.shot,
        { left: x - 10, top: y - 10 },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  shot: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Shot;
