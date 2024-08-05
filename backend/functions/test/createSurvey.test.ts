import { getMongoService } from 'src/services/mongoService';
import { getNotificationService } from 'src/services/notificationService';
import { getSurveyService } from 'src/services/surveyService';
import {
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeAll,
  afterAll
} from 'vitest';
import { createOne as createSurveyHandler } from '../src/handlers/survey';
import { Context, APIGatewayProxyEventV2 } from 'aws-lambda';

const mongoService = getMongoService();
const notificationService = getNotificationService();
const surveyService = getSurveyService();
describe('create survey', () => {
  beforeAll(async () => {
    await mongoService.connect();
  });

  afterEach(async () => {
    await mongoService.prune();
  });

  afterAll(async () => {
    await mongoService.close();
  });

  it('should save the survey in the database with the provided data', async () => {
    /**
     * @note
     * The createSurveyHandler function is invoked when the client/ FE application sends POST HTTP request to `/survey` endpoint create a new survey
     */
  });

  it('should send a notification when the survey is created', async () => {
    /**
     * @todo - implement the test
     */
  });
});
