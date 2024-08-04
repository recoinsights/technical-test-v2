import { SurveyForm } from '@/components/surveyForm';
import { SurveyResDto } from '@/dtos/surveyResDto';
import { useState } from 'react';

const defaultSurveyFormState: SurveyForm = {
  name: '',
  description: '',
  company: ''
};

/**
 * @note - a custom hook holding the state management/ business logic for the home page - (something like a presenter which returns view model in Model-View-Presenter pattern)
 */
export const useHomePage = () => {
  const [activeAction, setActiveAction] = useState<'createSurvey' | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const [isLoadingSurveys, setIsLoadingSurveys] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<SurveyResDto[]>([]);
  const [surveyFormData, setSurveyFormData] = useState<SurveyForm>({
    ...defaultSurveyFormState
  });

  const handleCreateSurveyButtonClick = () => {
    setSurveyFormData({ ...defaultSurveyFormState });
    setActiveAction('createSurvey');
  };

  const closeSurveyFormModal = () => {
    setActiveAction(null);
    setSurveyFormData({ ...defaultSurveyFormState });
  };

  const handleSurveyFormInputChange = <T extends keyof SurveyForm>(
    name: T,
    value: SurveyForm[T]
  ) => {
    setSurveyFormData({ ...surveyFormData, [name]: value });
  };

  const submitSurveyForm = async () => {
    setIsSubmittingForm(true);
    if (activeAction === 'createSurvey') {
      await makeCreateSurveyHttpRequest();
    }
    setIsSubmittingForm(false);
    closeSurveyFormModal();
    await updateSurveyList();
  };

  const isSurveyFormModalOpen = () => activeAction === 'createSurvey';

  const updateSurveyList = async () => {
    setIsLoadingSurveys(true);
    const surveys = await makeGetSurveysHttpRequest();
    setSurveys(surveys);
    setIsLoadingSurveys(false);
  };

  const makeCreateSurveyHttpRequest = async () => {
    /**
     * @todo - make API request to the BE
     */
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        console.log('Survey created successfully');
        resolve();
      }, 2000);
    });
  };

  const makeGetSurveysHttpRequest = () => {
    /**
     * @todo - make API request to the BE
     */
    return new Promise<SurveyResDto[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Survey 1',
            description: 'Survey 1 description',
            company: 'Company 1'
          },
          {
            id: '2',
            name: 'Survey 2',
            description: 'Survey 2 description',
            company: 'Company 2'
          },
          {
            id: '3',
            name: 'Survey 3',
            description: 'Survey 3 description',
            company: 'Company 3'
          }
        ]);
      }, 2000);
    });
  };

  return {
    handleCreateSurveyButtonClick,
    closeSurveyFormModal,
    isSurveyFormModalOpen,
    surveyFormData,
    handleSurveyFormInputChange,
    activeAction,
    submitSurveyForm,
    isSubmittingForm,
    updateSurveyList,
    surveys,
    isLoadingSurveys
  };
};
