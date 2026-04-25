import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { updateBees, produceHoney, updateHiveStatus, updateWeather, updateTimeOfDay } from '../utils/gameLogic';

export const useGameLoop = () => {
  const { state, updateState } = useGame();

  useEffect(() => {
    // Run game loop every second, but simulate 60 in-game minutes (1 hour)
    const interval = setInterval(() => {
      updateState(currentState => {
        // Update game time (60 in-game minutes per real second = 1 in-game hour per second)
        const newGameTime = currentState.gameTime + 60;

        // Update weather and time of day
        const newWeather = updateWeather(currentState.weather, newGameTime);
        const newTimeOfDay = updateTimeOfDay(newGameTime);

        // Update all hives
        const updatedHives = currentState.hives.map(hive => {
          // Update bees (60x faster)
          const updatedBees = updateBees(hive.bees, 60);

          // Produce honey and honeycomb (60x faster)
          const { honeyLevel, honeycombLevel } = produceHoney(
            hive,
            currentState.weather,
            currentState.timeOfDay,
            currentState.upgrades.productionSpeed.effect,
            60
          );

          const updatedHive = {
            ...hive,
            bees: updatedBees,
            honeyLevel,
            honeycombLevel,
          };

          // Update status
          updatedHive.status = updateHiveStatus(updatedHive);

          return updatedHive;
        });

        // Auto-collect if enabled and upgrade is purchased
        let autoCollectedHoney = 0;
        let autoCollectedHoneycomb = 0;

        if (currentState.autoCollectEnabled && currentState.upgrades.autoCollect.level > 0) {
          updatedHives.forEach(hive => {
            if (hive.honeyLevel >= 5) {
              autoCollectedHoney += Math.floor(hive.honeyLevel);
              hive.honeyLevel = 0;
            }
            if (hive.honeycombLevel >= 5) {
              autoCollectedHoneycomb += Math.floor(hive.honeycombLevel);
              hive.honeycombLevel = 0;
            }
          });
        }

        // Update dispensers (consume items over time, 60x faster)
        const updatedDispensers = currentState.dispensers.map(dispenser => {
          if (!dispenser.enabled) return dispenser;

          // Consume 1 item every 30 seconds, now 60x faster
          const consumeRate = (1 / 30) * 60;
          const newCurrent = Math.max(0, dispenser.current - consumeRate);

          let status: typeof dispenser.status = 'normal';
          const percentage = newCurrent / dispenser.capacity;
          if (percentage >= 0.8) status = 'full';
          else if (percentage <= 0.2) status = 'low';
          else if (percentage === 0) status = 'empty';

          return {
            ...dispenser,
            current: Math.floor(newCurrent),
            status,
          };
        });

        // Update production history (every in-game hour, which is now every second)
        let updatedHistory = [...currentState.productionHistory];
        if (newGameTime % 60 === 0) {
          const hour = Math.floor((newGameTime / 60) % 24);
          const totalBees = updatedHives.reduce((sum, h) => sum + h.bees.length, 0);
          const honeyProduced = updatedHives.reduce((sum, h) => sum + h.honeyLevel, 0);

          updatedHistory.push({
            time: `${hour.toString().padStart(2, '0')}:00`,
            honey: Math.round(honeyProduced),
            bees: totalBees,
          });

          // Keep only last 24 hours
          if (updatedHistory.length > 24) {
            updatedHistory = updatedHistory.slice(-24);
          }
        }

        // Return updated state
        return {
          ...currentState,
          gameTime: newGameTime,
          weather: newWeather,
          timeOfDay: newTimeOfDay,
          hives: updatedHives,
          dispensers: updatedDispensers,
          productionHistory: updatedHistory,
          resources: {
            ...currentState.resources,
            honey: currentState.resources.honey + autoCollectedHoney,
            honeycomb: currentState.resources.honeycomb + autoCollectedHoneycomb,
          },
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [updateState]);
};
