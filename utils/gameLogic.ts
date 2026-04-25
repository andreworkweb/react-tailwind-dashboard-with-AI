import { GameState, Hive, Bee, Weather, TimeOfDay } from '../types/game.types';

// Generate unique bee ID
export const generateBeeId = (): string => {
  return `bee_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Calculate production rate based on various factors
export const calculateProductionRate = (
  hive: Hive,
  weather: Weather,
  timeOfDay: TimeOfDay,
  productionSpeedUpgrade: number
): number => {
  let rate = hive.productionRate;

  // Weather modifier
  if (weather === 'clear') rate *= 1.2;
  if (weather === 'rain') rate *= 0.6;
  if (weather === 'thunder') rate *= 0.3;

  // Time of day modifier
  if (timeOfDay === 'night') rate *= 0.4;

  // Upgrade modifier
  rate *= (1 + productionSpeedUpgrade * 0.2);

  // Bee count modifier
  const beeEfficiency = hive.bees.length / hive.maxBees;
  rate *= beeEfficiency;

  return rate;
};

// Update bee states and progress
export const updateBees = (bees: Bee[], deltaTime: number): Bee[] => {
  return bees.map(bee => {
    const newBee = { ...bee };

    // Update progress based on state
    const progressSpeed = 2; // 2% per tick
    newBee.progress += progressSpeed * deltaTime;

    // State transitions
    if (newBee.progress >= 100) {
      newBee.progress = 0;

      switch (newBee.state) {
        case 'in_hive':
          newBee.state = 'collecting';
          break;
        case 'collecting':
          newBee.state = 'returning';
          break;
        case 'returning':
          newBee.state = 'in_hive';
          break;
      }
    }

    return newBee;
  });
};

// Calculate honey production for a hive
export const produceHoney = (
  hive: Hive,
  weather: Weather,
  timeOfDay: TimeOfDay,
  productionSpeedUpgrade: number,
  deltaTime: number
): { honeyLevel: number; honeycombLevel: number } => {
  const rate = calculateProductionRate(hive, weather, timeOfDay, productionSpeedUpgrade);

  // Count bees that are returning (they bring resources)
  const returningBees = hive.bees.filter(b => b.state === 'returning').length;

  let honeyLevel = hive.honeyLevel;
  let honeycombLevel = hive.honeycombLevel;

  if (returningBees > 0 && honeyLevel < 5) {
    const production = rate * deltaTime * 0.01; // Convert to small increments
    honeyLevel = Math.min(5, honeyLevel + production);
  }

  if (returningBees > 0 && honeycombLevel < 5) {
    const production = rate * deltaTime * 0.008; // Slightly slower for honeycomb
    honeycombLevel = Math.min(5, honeycombLevel + production);
  }

  return { honeyLevel, honeycombLevel };
};

// Update hive status based on levels
export const updateHiveStatus = (hive: Hive): Hive['status'] => {
  if (hive.honeyLevel >= 5 && hive.honeycombLevel >= 5) return 'full';
  if (hive.bees.length === 0) return 'empty';
  if (hive.bees.length < hive.maxBees * 0.5) return 'warning';
  return 'active';
};

// Weather change logic
export const updateWeather = (currentWeather: Weather, gameTime: number): Weather => {
  // Change weather every ~10 in-game hours
  const weatherCycle = Math.floor(gameTime / 600);
  const rand = (weatherCycle * 7) % 10; // Pseudo-random based on cycle

  if (rand < 6) return 'clear';
  if (rand < 9) return 'rain';
  return 'thunder';
};

// Day/night cycle
export const updateTimeOfDay = (gameTime: number): TimeOfDay => {
  const hourOfDay = (gameTime / 60) % 24;
  return (hourOfDay >= 6 && hourOfDay < 20) ? 'day' : 'night';
};

// Calculate sell price for resources
export const calculateSellPrice = (type: 'honey' | 'honeycomb' | 'honeyBlock', amount: number): number => {
  const prices = {
    honey: 10,
    honeycomb: 5,
    honeyBlock: 40,
  };
  return prices[type] * amount;
};

// Calculate upgrade cost
export const calculateUpgradeCost = (basePrice: number, level: number): number => {
  return Math.floor(basePrice * Math.pow(1.5, level));
};

// Check if storage is full
export const isStorageFull = (chests: GameState['chests']): boolean => {
  return chests.some(chest => chest.status === 'full');
};

// Auto-collect from full hives
export const autoCollectFromHives = (hives: Hive[]): { honey: number; honeycomb: number } => {
  let totalHoney = 0;
  let totalHoneycomb = 0;

  hives.forEach(hive => {
    if (hive.honeyLevel >= 5) {
      totalHoney += Math.floor(hive.honeyLevel);
    }
    if (hive.honeycombLevel >= 5) {
      totalHoneycomb += Math.floor(hive.honeycombLevel);
    }
  });

  return { honey: totalHoney, honeycomb: totalHoneycomb };
};
