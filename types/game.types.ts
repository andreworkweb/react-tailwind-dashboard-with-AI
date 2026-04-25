// Game Types and Interfaces

export type BeeState = 'in_hive' | 'collecting' | 'returning';
export type HiveStatus = 'active' | 'full' | 'empty' | 'warning';
export type Weather = 'clear' | 'rain' | 'thunder';
export type TimeOfDay = 'day' | 'night';

export interface Bee {
  id: string;
  state: BeeState;
  progress: number; // 0-100, progress of current action
}

export interface Hive {
  id: number;
  name: string;
  bees: Bee[];
  maxBees: number;
  honeyLevel: number; // 0-5
  honeycombLevel: number; // 0-5
  location: string;
  status: HiveStatus;
  productionRate: number; // base rate multiplier
}

export interface Resources {
  honey: number; // honey bottles
  honeycomb: number; // honeycomb items
  honeyBlock: number; // honey blocks
  money: number; // in-game currency
}

export interface Dispenser {
  id: number;
  name: string;
  type: 'shears' | 'bottles';
  enabled: boolean;
  capacity: number;
  current: number;
  status: 'full' | 'normal' | 'low' | 'empty';
}

export interface Chest {
  id: number;
  name: string;
  capacity: number;
  used: number;
  status: 'normal' | 'warning' | 'full';
  items: StorageItem[];
}

export interface StorageItem {
  id: number;
  name: string;
  icon: string;
  stacks: number;
  maxStacks: number;
  itemsPerStack: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  effect: number; // multiplier or bonus value
}

export interface ProductionData {
  time: string;
  honey: number;
  bees: number;
}

export interface GameState {
  // Core resources
  resources: Resources;

  // Hives and bees
  hives: Hive[];

  // Storage
  chests: Chest[];
  dispensers: Dispenser[];

  // Upgrades
  upgrades: {
    productionSpeed: Upgrade;
    hiveCapacity: Upgrade;
    autoCollect: Upgrade;
    storageExpansion: Upgrade;
  };

  // Environment
  weather: Weather;
  timeOfDay: TimeOfDay;
  gameTime: number; // in-game minutes since start

  // Analytics
  productionHistory: ProductionData[];

  // Settings
  autoCollectEnabled: boolean;
  lastSaveTime: number;
}

export interface GameActions {
  // Resource actions
  collectHoney: (hiveId: number) => void;
  collectHoneycomb: (hiveId: number) => void;
  sellResources: (type: 'honey' | 'honeycomb' | 'honeyBlock', amount: number) => void;

  // Hive actions
  buyHive: () => void;
  addBeesToHive: (hiveId: number) => void;

  // Dispenser actions
  toggleDispenser: (dispenserId: number) => void;
  refillDispenser: (dispenserId: number, amount: number) => void;

  // Upgrade actions
  purchaseUpgrade: (upgradeId: keyof GameState['upgrades']) => void;

  // Storage actions
  expandStorage: () => void;

  // Automation
  forceCollectAll: () => void;
  toggleAutoCollect: () => void;

  // System
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}
