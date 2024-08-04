import { SurveyForm } from '@/components/surveyForm';
import { SurveyResDto } from '@/dtos/surveyResDto';
import { useState } from 'react';

/**
 * @note - functions for fetching data or making API requests should be stored/ organised in a separate layer in an ideal setup
 */
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
  const [surveyFormErrors, setSurveyFormErrors] = useState<
    Record<string, string | null>
  >({});

  const handleCreateSurveyButtonClick = () => {
    setActiveAction('createSurvey');
  };

  const closeSurveyFormModal = () => {
    setActiveAction(null);
    setSurveyFormData({ ...defaultSurveyFormState });
    setSurveyFormErrors({});
  };

  const isSurveyFormModalOpen = () => activeAction === 'createSurvey';

  const handleSurveyFormInputChange = <T extends keyof SurveyForm>(
    name: T,
    value: SurveyForm[T]
  ) => {
    setSurveyFormData({ ...surveyFormData, [name]: value });
    setSurveyFormErrors({
      ...surveyFormErrors,
      [name]: null
    });
  };

  /**
   * @returns {boolean} - returns true if the form is valid
   */
  const validateSurveyForm = () => {
    const errors: Record<string, string | null> = {};

    if (!surveyFormData.name) {
      errors.name = 'Name is required';
    }

    if (!surveyFormData.company) {
      errors.company = 'Company is required';
    }

    setSurveyFormErrors(errors);

    return !Object.keys(errors).length;
  };

  const submitSurveyForm = async () => {
    setSurveyFormErrors({});
    if (!validateSurveyForm()) {
      return;
    }
    setIsSubmittingForm(true);
    if (activeAction === 'createSurvey') {
      await makeCreateSurveyHttpRequest();
    }
    setIsSubmittingForm(false);
    closeSurveyFormModal();
    await updateSurveyList();
  };

  const updateSurveyList = async () => {
    setIsLoadingSurveys(true);
    const surveys = await makeGetSurveysHttpRequest();
    setSurveys(surveys);
    setIsLoadingSurveys(false);
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
    isLoadingSurveys,
    surveyFormErrors
  };
};
