import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CenterCircleProps {
  radius: number;
}

const CenterCircle = ({ radius }: CenterCircleProps) => {
  return (
    <View
      style={[
        styles.circle,
        {
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }], // Ajuste para metade do diâmetro
    backgroundColor: 'red',
    opacity: 0.3,
    pointerEvents: 'none',
  },
});

export default CenterCircle;
