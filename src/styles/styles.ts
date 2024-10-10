// src/styles/styles.ts
import { StyleSheet } from 'react-native';
import { GRID_SIZE, GRID_CENTER, CIRCLE_RADIUS_PX } from '../constants/Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'black',
  },
  line: {
    position: 'absolute',
    backgroundColor: 'lightgray',
  },
  shot: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  centerCircle: {
    position: 'absolute',
    width: CIRCLE_RADIUS_PX * 2,
    height: CIRCLE_RADIUS_PX * 2,
    borderRadius: CIRCLE_RADIUS_PX,
    backgroundColor: 'red',
    top: GRID_CENTER - CIRCLE_RADIUS_PX,
    left: GRID_CENTER - CIRCLE_RADIUS_PX,
    opacity: 0.3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
  },
});
