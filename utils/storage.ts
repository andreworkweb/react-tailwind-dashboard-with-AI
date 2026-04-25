import { GameState } from '../types/game.types';

const STORAGE_KEY = 'minecraft_bee_farm_save';

export const saveGameToStorage = (gameState: GameState): void => {
  try {
    const saveData = {
      ...gameState,
      lastSaveTime: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    console.log('Game saved successfully');
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

export const loadGameFromStorage = (): GameState | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      return null;
    }
    const gameState = JSON.parse(savedData) as GameState;
    console.log('Game loaded successfully');
    return gameState;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
};

export const clearGameStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Game data cleared');
  } catch (error) {
    console.error('Failed to clear game data:', error);
  }
};

export const hasExistingSave = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
