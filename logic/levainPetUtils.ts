import { LevainStarter, LevainFeedingLog } from '../types';

type LevainStatus = "ativo" | "precisa_atencao" | "descanso" | "arquivado";

/**
 * Calculates the current status of a levain starter based on its last feeding.
 * @param levain The LevainStarter object.
 * @param logs An array of recent LevainFeedingLog objects, sorted descending by date.
 * @returns The calculated status.
 */
export const calculateLevainStatus = (
  levain: LevainStarter,
  logs: LevainFeedingLog[]
): LevainStatus => {
  // Manual override status takes precedence
  if (levain.status === 'arquivado') {
    return 'arquivado';
  }

  const lastFeedingTime = logs.length > 0 ? logs[0].dateTime : levain.createdAt;

  if (!lastFeedingTime) {
    // Should not happen if levain is created correctly, but as a fallback
    return 'precisa_atencao';
  }

  const hoursSinceLastActivity = (new Date().getTime() - lastFeedingTime.toDate().getTime()) / (1000 * 60 * 60);
  const SEVEN_DAYS_IN_HOURS = 7 * 24;

  if (hoursSinceLastActivity <= 48) {
    return 'ativo';
  } else if (hoursSinceLastActivity > 48 && hoursSinceLastActivity <= SEVEN_DAYS_IN_HOURS) {
    return 'precisa_atencao';
  } else {
    return 'descanso';
  }
};
