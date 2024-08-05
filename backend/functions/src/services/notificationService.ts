import { Survey } from 'src/models/survey';

export class NotificationService {
  public notifySurveyCreated = async (survey: Survey) => {
    // this will send send out an actual email in a real application
    console.log(
      `Sending email to notify that survey ${survey.name} was created`
    );
  };
}

let instance: NotificationService;

export const getNotificationService = () => {
  if (!instance) {
    instance = new NotificationService();
  }

  return instance;
};
