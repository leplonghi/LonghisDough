// A mock analytics service for demonstration.
// In a real app, this would integrate with a service like Firebase Analytics, PostHog, etc.

interface AnalyticsEvent {
    name: string;
    params: { [key: string]: any };
}

/**
 * Logs an event to the analytics service.
 * Fails silently if the service is unavailable.
 * @param event The event object containing name and payload.
 */
// FIX: The `logEvent` function expects a single object argument of type `AnalyticsEvent`.
// The current signature `(event: AnalyticsEvent)` is correct for this usage.
export const logEvent = (event: AnalyticsEvent) => {
    try {
        // In a real app, you would call your analytics provider here.
        // For example: firebase.analytics().logEvent(event.name, event.params);
        console.log('[ANALYTICS]', event);

    } catch (error) {
        console.warn('Analytics service is unavailable or failed to log event:', error);
    }
};