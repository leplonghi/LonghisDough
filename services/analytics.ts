// A mock analytics service for demonstration.
// In a real app, this would integrate with a service like Firebase Analytics, PostHog, etc.

interface AnalyticsEvent {
    name: string;
    params: { [key: string]: any };
}

/**
 * Logs an event to the analytics service.
 * Fails silently if the service is unavailable.
 * @param eventName The name of the event.
 * @param payload The event data.
 */
export const logEvent = (eventName: string, payload: { [key: string]: any } = {}) => {
    try {
        const event: AnalyticsEvent = {
            name: eventName,
            params: payload,
        };

        // In a real app, you would call your analytics provider here.
        // For example: firebase.analytics().logEvent(eventName, payload);
        console.log('[ANALYTICS]', event);

    } catch (error) {
        console.warn('Analytics service is unavailable or failed to log event:', error);
    }
};
