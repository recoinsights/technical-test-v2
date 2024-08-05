import { getSurveyService } from 'src/services/surveyService';
import { requestHandler, responseJson } from './handler';
import { z } from 'zod';
import { getNotificationService } from 'src/services/notificationService';

const saveSurveySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  company: z.string()
});

const surveyService = getSurveyService();
const notificationService = getNotificationService();

export const findMany = requestHandler(async (event) => {
  const surveys = await surveyService.findMany();

  return responseJson(surveys);
});

export const createOne = requestHandler(async (event) => {
  const rawBody = JSON.parse(event.body || '{}');
  const parsedBody = saveSurveySchema.parse(rawBody);
  const createdSurvey = await surveyService.createOne(parsedBody);
  await notificationService.notifySurveyCreated(createdSurvey);

  return responseJson('Survey created successfully', 201);
});
