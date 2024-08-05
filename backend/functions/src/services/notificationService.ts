export class NotificationService {}

let instance: NotificationService;

export const getNotificationService = () => {
  if (!instance) {
    instance = new NotificationService();
  }

  return instance;
};
