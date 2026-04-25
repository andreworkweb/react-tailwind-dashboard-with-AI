import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, GameActions, Hive, Bee } from '../types/game.types';
import { saveGameToStorage, loadGameFromStorage, clearGameStorage } from '../utils/storage';
import { generateBeeId, calculateUpgradeCost, calculateSellPrice, updateHiveStatus } from '../utils/gameLogic';

// Initial game state
const createInitialState = (): GameState => ({
  resources: {
    honey: 0,
    honeycomb: 0,
    honeyBlock: 0,
    money: 1000, // Starting money
  },
  hives: [
    {
      id: 1,
      name: 'Hive Alpha',
      bees: [
        { id: generateBeeId(), state: 'in_hive', progress: 0 },
        { id: generateBeeId(), state: 'collecting', progress: 30 },
        { id: generateBeeId(), state: 'returning', progress: 60 },
      ],
      maxBees: 3,
      honeyLevel: 2,
      honeycombLevel: 1,
      location: 'X: 120, Z: 45',
      status: 'active',
      productionRate: 1.0,
    },
    {
      id: 2,
      name: 'Hive Beta',
      bees: [
        { id: generateBeeId(), state: 'in_hive', progress: 0 },
        { id: generateBeeId(), state: 'collecting', progress: 50 },
      ],
      maxBees: 3,
      honeyLevel: 1,
      honeycombLevel: 0,
      location: 'X: 135, Z: 48',
      status: 'active',
      productionRate: 1.0,
    },
  ],
  chests: [
    {
      id: 1,
      name: 'Main Storage',
      capacity: 27,
      used: 5,
      status: 'normal',
      items: [
        { id: 1, name: 'Honeycomb', icon: '⬡', stacks: 3, maxStacks: 64, itemsPerStack: 64 },
        { id: 2, name: 'Honey Bottle', icon: '🍯', stacks: 2, maxStacks: 16, itemsPerStack: 16 },
      ],
    },
  ],
  dispensers: [
    { id: 1, name: 'Shears Dispenser A', type: 'shears', enabled: true, capacity: 64, current: 45, status: 'normal' },
    { id: 2, name: 'Bottle Dispenser A', type: 'bottles', enabled: true, capacity: 64, current: 58, status: 'full' },
  ],
  upgrades: {
    productionSpeed: {
      id: 'productionSpeed',
      name: 'Production Speed',
      description: 'Increase honey production rate',
      cost: 500,
      level: 0,
      maxLevel: 10,
      effect: 0,
    },
    hiveCapacity: {
      id: 'hiveCapacity',
      name: 'Hive Capacity',
      description: 'Increase max bees per hive',
      cost: 800,
      level: 0,
      maxLevel: 5,
      effect: 0,
    },
    autoCollect: {
      id: 'autoCollect',
      name: 'Auto Collection',
      description: 'Automatically collect from full hives',
      cost: 1500,
      level: 0,
      maxLevel: 1,
      effect: 0,
    },
    storageExpansion: {
      id: 'storageExpansion',
      name: 'Storage Expansion',
      description: 'Add more chest capacity',
      cost: 1000,
      level: 0,
      maxLevel: 5,
      effect: 0,
    },
  },
  weather: 'clear',
  timeOfDay: 'day',
  gameTime: 360, // Start at 6:00 AM
  productionHistory: [],
  autoCollectEnabled: false,
  lastSaveTime: Date.now(),
});

interface GameContextType {
  state: GameState;
  actions: GameActions;
  updateState: (updater: (prev: GameState) => GameState) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(createInitialState);

  // Load game on mount
  useEffect(() => {
    const savedState = loadGameFromStorage();
    if (savedState) {
      setState(savedState);
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveGameToStorage(state);
    }, 30000);
    return () => clearInterval(interval);
  }, [state]);

  // Expose setState for game loop
  const updateState = useCallback((updater: (prev: GameState) => GameState) => {
    setState(updater);
  }, []);

  // Collect honey from a hive
  const collectHoney = useCallback((hiveId: number) => {
    setState(prev => {
      const hive = prev.hives.find(h => h.id === hiveId);
      if (!hive || hive.honeyLevel < 1) return prev;

      const collected = Math.floor(hive.honeyLevel);
      return {
        ...prev,
        resources: {
          ...prev.resources,
          honey: prev.resources.honey + collected,
        },
        hives: prev.hives.map(h =>
          h.id === hiveId
            ? { ...h, honeyLevel: 0, status: updateHiveStatus({ ...h, honeyLevel: 0 }) }
            : h
        ),
      };
    });
  }, []);

  // Collect honeycomb from a hive
  const collectHoneycomb = useCallback((hiveId: number) => {
    setState(prev => {
      const hive = prev.hives.find(h => h.id === hiveId);
      if (!hive || hive.honeycombLevel < 1) return prev;

      const collected = Math.floor(hive.honeycombLevel);
      return {
        ...prev,
        resources: {
          ...prev.resources,
          honeycomb: prev.resources.honeycomb + collected,
        },
        hives: prev.hives.map(h =>
          h.id === hiveId
            ? { ...h, honeycombLevel: 0, status: updateHiveStatus({ ...h, honeycombLevel: 0 }) }
            : h
        ),
      };
    });
  }, []);

  // Sell resources
  const sellResources = useCallback((type: 'honey' | 'honeycomb' | 'honeyBlock', amount: number) => {
    setState(prev => {
      if (prev.resources[type] < amount) return prev;

      const earnings = calculateSellPrice(type, amount);
      return {
        ...prev,
        resources: {
          ...prev.resources,
          [type]: prev.resources[type] - amount,
          money: prev.resources.money + earnings,
        },
      };
    });
  }, []);

  // Buy a new hive
  const buyHive = useCallback(() => {
    const cost = 2000;
    setState(prev => {
      if (prev.resources.money < cost) return prev;

      const newHive: Hive = {
        id: prev.hives.length + 1,
        name: `Hive ${String.fromCharCode(65 + prev.hives.length)}`,
        bees: [],
        maxBees: 3,
        honeyLevel: 0,
        honeycombLevel: 0,
        location: `X: ${100 + prev.hives.length * 15}, Z: ${40 + prev.hives.length * 5}`,
        status: 'empty',
        productionRate: 1.0,
      };

      return {
        ...prev,
        resources: {
          ...prev.resources,
          money: prev.resources.money - cost,
        },
        hives: [...prev.hives, newHive],
      };
    });
  }, []);

  // Add bees to a hive
  const addBeesToHive = useCallback((hiveId: number) => {
    const cost = 300;
    setState(prev => {
      const hive = prev.hives.find(h => h.id === hiveId);
      if (!hive || hive.bees.length >= hive.maxBees || prev.resources.money < cost) return prev;

      const newBee: Bee = {
        id: generateBeeId(),
        state: 'in_hive',
        progress: 0,
      };

      return {
        ...prev,
        resources: {
          ...prev.resources,
          money: prev.resources.money - cost,
        },
        hives: prev.hives.map(h =>
          h.id === hiveId
            ? { ...h, bees: [...h.bees, newBee], status: updateHiveStatus({ ...h, bees: [...h.bees, newBee] }) }
            : h
        ),
      };
    });
  }, []);

  // Toggle dispenser
  const toggleDispenser = useCallback((dispenserId: number) => {
    setState(prev => ({
      ...prev,
      dispensers: prev.dispensers.map(d =>
        d.id === dispenserId ? { ...d, enabled: !d.enabled } : d
      ),
    }));
  }, []);

  // Refill dispenser
  const refillDispenser = useCallback((dispenserId: number, amount: number) => {
    const cost = amount * 2;
    setState(prev => {
      if (prev.resources.money < cost) return prev;

      return {
        ...prev,
        resources: {
          ...prev.resources,
          money: prev.resources.money - cost,
        },
        dispensers: prev.dispensers.map(d =>
          d.id === dispenserId
            ? { ...d, current: Math.min(d.capacity, d.current + amount) }
            : d
        ),
      };
    });
  }, []);

  // Purchase upgrade
  const purchaseUpgrade = useCallback((upgradeId: keyof GameState['upgrades']) => {
    setState(prev => {
      const upgrade = prev.upgrades[upgradeId];
      if (upgrade.level >= upgrade.maxLevel) return prev;

      const cost = calculateUpgradeCost(upgrade.cost, upgrade.level);
      if (prev.resources.money < cost) return prev;

      return {
        ...prev,
        resources: {
          ...prev.resources,
          money: prev.resources.money - cost,
        },
        upgrades: {
          ...prev.upgrades,
          [upgradeId]: {
            ...upgrade,
            level: upgrade.level + 1,
            effect: upgrade.level + 1,
          },
        },
      };
    });
  }, []);

  // Expand storage
  const expandStorage = useCallback(() => {
    const cost = 1500;
    setState(prev => {
      if (prev.resources.money < cost) return prev;

      const newChest = {
        id: prev.chests.length + 1,
        name: `Storage ${prev.chests.length + 1}`,
        capacity: 27,
        used: 0,
        status: 'normal' as const,
        items: [],
      };

      return {
        ...prev,
        resources: {
          ...prev.resources,
          money: prev.resources.money - cost,
        },
        chests: [...prev.chests, newChest],
      };
    });
  }, []);

  // Force collect all hives
  const forceCollectAll = useCallback(() => {
    setState(prev => {
      let totalHoney = 0;
      let totalHoneycomb = 0;

      const updatedHives = prev.hives.map(hive => {
        totalHoney += Math.floor(hive.honeyLevel);
        totalHoneycomb += Math.floor(hive.honeycombLevel);
        return {
          ...hive,
          honeyLevel: 0,
          honeycombLevel: 0,
          status: updateHiveStatus({ ...hive, honeyLevel: 0, honeycombLevel: 0 }),
        };
      });

      return {
        ...prev,
        resources: {
          ...prev.resources,
          honey: prev.resources.honey + totalHoney,
          honeycomb: prev.resources.honeycomb + totalHoneycomb,
        },
        hives: updatedHives,
      };
    });
  }, []);

  // Toggle auto-collect
  const toggleAutoCollect = useCallback(() => {
    setState(prev => ({
      ...prev,
      autoCollectEnabled: !prev.autoCollectEnabled,
    }));
  }, []);

  // Save game
  const saveGame = useCallback(() => {
    saveGameToStorage(state);
  }, [state]);

  // Load game
  const loadGame = useCallback(() => {
    const savedState = loadGameFromStorage();
    if (savedState) {
      setState(savedState);
    }
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    clearGameStorage();
    setState(createInitialState());
  }, []);

  const actions: GameActions = {
    collectHoney,
    collectHoneycomb,
    sellResources,
    buyHive,
    addBeesToHive,
    toggleDispenser,
    refillDispenser,
    purchaseUpgrade,
    expandStorage,
    forceCollectAll,
    toggleAutoCollect,
    saveGame,
    loadGame,
    resetGame,
  };

  return (
    <GameContext.Provider value={{ state, actions, updateState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
