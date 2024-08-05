import { getSurveyService } from 'src/services/surveyService';
import { requestHandler, responseJson } from './handler';
import { z } from 'zod';

const saveSurveySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  company: z.string()
});

const surveyService = getSurveyService();

export const findMany = requestHandler(async (event) => {
  const surveys = await surveyService.findMany();

  return responseJson(surveys);
});

export const createOne = requestHandler(async (event) => {
  const rawBody = JSON.parse(event.body || '{}');
  const parsedBody = saveSurveySchema.parse(rawBody);
  await surveyService.createOne(parsedBody);

  return responseJson('Survey created successfully', 201);
});
