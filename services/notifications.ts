// A mock notification service.
// In a real app, this would handle Push Notifications or Local Notifications.

/**
 * Schedules a notification for a levain feeding reminder.
 * @param levainName The name of the levain.
 * @param levainId The ID of the levain.
 * @param scheduledTime The Date object for when to show the notification.
 */
export const scheduleNotification = async (levainName: string, levainId: string, scheduledTime: Date) => {
    try {
        if (!('Notification' in window)) {
            console.warn('This browser does not support desktop notification');
            return;
        }

        if (Notification.permission === 'granted') {
            console.log(`[NOTIFICATIONS] Scheduling notification for "${levainName}" at ${scheduledTime.toLocaleString()}`);
            // In a real implementation with a service worker, you'd schedule it here.
            // For a simple local notification demo (doesn't work with scheduling):
            // new Notification(`Hora de alimentar seu Levain Pet`, {
            //     body: `O levain ${levainName} está próximo do intervalo ideal de alimentação.`,
            //     tag: `levain-${levainId}`
            // });
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                scheduleNotification(levainName, levainId, scheduledTime);
            }
        }
    } catch (error) {
        console.warn('Notification service failed:', error);
    }
};

/**
 * Cancels all scheduled notifications for a specific levain.
 * @param levainId The ID of the levain whose notifications should be canceled.
 */
export const cancelNotificationsForLevain = async (levainId: string) => {
    try {
        console.log(`[NOTIFICATIONS] Canceling all notifications for levain ID: ${levainId}`);
        // In a real implementation with a service worker, you would find and cancel
        // notifications with a specific tag, e.g., `levain-${levainId}`.
    } catch (error) {
        console.warn('Failed to cancel notifications:', error);
    }
};
