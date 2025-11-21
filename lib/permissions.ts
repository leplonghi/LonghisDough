
import { User } from '../types';

/**
 * Checks if the user has an active trial period.
 */
export function isTrialActive(user: User | null | undefined): boolean {
  if (!user || !user.trialEndsAt) return false;
  const now = new Date();
  const end = new Date(user.trialEndsAt);
  return end > now;
}

/**
 * Checks if the user has Pro status (either via subscription, explicit plan, or active trial).
 */
export function isProUser(user: User | null | undefined): boolean {
  if (!user) return false;
  // User is Pro if the flag is true, plan is 'pro', or if they are in a valid trial
  return !!user.isPro || user.plan === 'pro' || isTrialActive(user);
}

/**
 * Checks if the user is on the Free tier.
 */
export function isFreeUser(user: User | null | undefined): boolean {
  return !isProUser(user);
}

/**
 * Returns the number of days remaining in the trial.
 * Returns 0 if trial is expired or not active.
 */
export function remainingTrialDays(user: User | null | undefined): number {
  if (!user || !user.trialEndsAt) return 0;
  
  const now = new Date();
  const end = new Date(user.trialEndsAt);
  
  if (end <= now) return 0;
  
  const diffTime = Math.abs(end.getTime() - now.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}
