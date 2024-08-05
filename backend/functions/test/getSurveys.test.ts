import { getMongoService } from 'src/services/mongoService';
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
import { findMany as getSurveysHandler } from '../src/handlers/survey';
import { SurveyModel } from '../src/models/survey';
import { Context, APIGatewayProxyEventV2 } from 'aws-lambda';

const mongoService = getMongoService();
const surveyService = getSurveyService();
describe('get surveys', () => {
  beforeAll(async () => {
    await mongoService.connect();
  });

  afterEach(async () => {
    await mongoService.prune();
  });

  afterAll(async () => {
    await mongoService.close();
  });

  it('should return all the surveys sorted by name in ascending order', async () => {
    const surveys = await SurveyModel.create([
      {
        name: 'Survey 3',
        description: 'Description 3',
        company: 'Company 3'
      },
      {
        name: 'Survey 2',
        description: 'Description 2',
        company: 'Company 2'
      },
      {
        name: 'Survey 1',
        description: 'Description 1',
        company: 'Company 1'
      }
    ]);

    const response = await getSurveysHandler(
      {
        pathParameters: {},
        body: JSON.stringify({}) // pass the body payload
      } as unknown as APIGatewayProxyEventV2,
      {} as unknown as Context
    );

    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.body ?? '[]');
    expect(responseData.length).toBe(3);
    expect(responseData[0].name).toBe('Survey 1');
    expect(responseData[0].description).toBe('Description 1');
    expect(responseData[0].company).toBe('Company 1');
    expect(responseData[1].name).toBe('Survey 2');
    expect(responseData[1].description).toBe('Description 2');
    expect(responseData[1].company).toBe('Company 2');
    expect(responseData[2].name).toBe('Survey 3');
    expect(responseData[2].description).toBe('Description 3');
    expect(responseData[2].company).toBe('Company 3');
  });
});
