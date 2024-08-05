import { SurveyModel, Survey } from 'src/models/survey';

type SaveSurveyData = {
  name: string;
  description?: string;
  company: string;
};

export class SurveyService {
  public findMany = async (): Promise<Survey[]> => {
    const surveyDocs = await SurveyModel.find({});
    return surveyDocs.map((doc) => doc.toJSON());
  };

  public createOne = async (data: SaveSurveyData): Promise<Survey> => {
    const survey = await SurveyModel.create(data);

    return survey.toJSON();
  };
}

let instance: SurveyService;

export const getSurveyService = () => {
  if (!instance) {
    instance = new SurveyService();
  }

  return instance;
};
