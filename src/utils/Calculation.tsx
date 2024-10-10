// src/utils/calculations.ts
export const calculateAdjustment = (errorShots: { x: number; y: number }[]) => {
  const GRID_SIZE = 400;
  const SQUARE_SIZE = 50;

  const xAvg = errorShots.reduce((sum, shot) => sum + ((shot.x - GRID_SIZE / 2) / SQUARE_SIZE), 0) / errorShots.length;
  const yAvg = errorShots.reduce((sum, shot) => sum + ((GRID_SIZE / 2 - shot.y) / SQUARE_SIZE), 0) / errorShots.length;

  return { x: -xAvg, y: -yAvg };
};
