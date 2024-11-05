import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Grid from './src/components/Grid';
import CenterCircle from './src/components/CenterCircle';
import Shot from './src/components/Shot';
import InfoModal from './src/modals/InfoModal';
import AdjustmentModal from './src/modals/AdjustmentModal';
import { calculateAdjustment } from './src/utils/Calculation';

const GRID_SIZE = 400;
const CIRCLE_RADIUS_PX = 75; 
const MAX_ERR_SHOTS = 3; 

const App = () => {
  const [shots, setShots] = useState<{ x: number; y: number }[]>([]);
  const [errorShots, setErrorShots] = useState<{ x: number; y: number }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [adjustmentModalVisible, setAdjustmentModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [lastCoordinates, setLastCoordinates] = useState<{ x: number; y: number } | null>(null);
  const [adjustment, setAdjustment] = useState<{ x: number; y: number } | null>(null);

  // Função que trata o clique na tela
  const handleShoot = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
  
    // Verifica se o clique está dentro do grid
    if (locationX >= 0 && locationX <= GRID_SIZE && locationY >= 0 && locationY <= GRID_SIZE) {
      const isInsideCircle = checkCalibration(locationX, locationY);
      const newShot = { x: locationX, y: locationY };
  
      // Adiciona o ponto clicado
      setShots((prevShots) => [...prevShots, newShot]);
  
      if (isInsideCircle) {
        // Se o tiro for correto
        setMessage('Tiro correto! A mira está calibrada.');
        setModalVisible(true);
        resetErrorShots();
      } else {
        const newErrorShots = [...errorShots, newShot];
        setErrorShots(newErrorShots);
        if (newErrorShots.length === MAX_ERR_SHOTS) {
          const adj = calculateAdjustment(newErrorShots);
          setAdjustment(adj);
          setMessage('Você disparou três vezes. Ajuste necessário na mira.');
          setAdjustmentModalVisible(true); 
        }
      }
  
      setLastCoordinates({ x: (locationX - GRID_SIZE / 2) / 50, y: -(locationY - GRID_SIZE / 2) / 50 });
    }
  };
  
  const resetShots = () => {
    setShots([]); 
    setErrorShots([]); 
    setModalVisible(false); 
    setAdjustmentModalVisible(false); 
    setAdjustment(null); 
    setLastCoordinates(null); 
  };

  const checkCalibration = (locationX: number, locationY: number) => {
    const dx = locationX - GRID_SIZE / 2;
    const dy = locationY - GRID_SIZE / 2;
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
    return distanceFromCenter <= CIRCLE_RADIUS_PX;
  };

  const resetErrorShots = () => {
    setErrorShots([]); 
  };

  const renderGridLines = () => {
    const gridLines = [];
    for (let i = -4; i <= 4; i++) {
      // Linhas horizontais
      gridLines.push(
        <View
          key={`horizontal-${i}`}
          style={[
            styles.line,
            { top: GRID_SIZE / 2 + i * 50, height: 1, width: GRID_SIZE, backgroundColor: 'lightgray' },
          ]}
        />
      );

      gridLines.push(
        <View
          key={`vertical-${i}`}
          style={[
            styles.line,
            { left: GRID_SIZE / 2 + i * 50, width: 1, height: GRID_SIZE, backgroundColor: 'lightgray' },
          ]}
        />
      );
    }
    return gridLines;
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleShoot}>
        <View style={styles.gridWrapper}>
          <Grid renderGridLines={renderGridLines}>
            <CenterCircle radius={CIRCLE_RADIUS_PX} />
            {/* Renderiza tiros corretos */}
            {shots.map((shot, index) => (
              <Shot key={index} x={shot.x} y={shot.y} />
            ))}
            {/* Renderiza tiros errados também */}
            {errorShots.map((errorShot, index) => (
              <Shot key={`error-${index}`} x={errorShot.x} y={errorShot.y} />
            ))}
          </Grid>
        </View>
      </TouchableWithoutFeedback>

      <InfoModal
        visible={modalVisible}
        message={message}
        coordinates={lastCoordinates || undefined}
        onClose={resetShots}
      />

      <AdjustmentModal
        visible={adjustmentModalVisible}
        coordinates={adjustment || { x: 0, y: 0 }}
        onClose={() => setAdjustmentModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridWrapper: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderWidth: 1,
    borderColor: 'black',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    backgroundColor: 'lightgray',
  },
});

export default App;
