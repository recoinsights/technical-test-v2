import { Inter } from 'next/font/google';
import _Modal from 'react-modal';
import { Modal } from '@/components/Modal';
import { SurveyForm } from '@/components/SurveyForm';
import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';
import { SurveyResDto } from '@/dtos/surveyResDto';
const inter = Inter({ subsets: ['latin'] });

_Modal.setAppElement('#__next');

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
 * @note - also in an ideal setup, this custom hook should be moved to a separate file
 */
export const useHomePage = () => {
  const [currentAction, setCurrentAction] = useState<'createSurvey' | null>(
    null
  );
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
    setCurrentAction('createSurvey');
  };

  const closeSurveyFormModal = () => {
    setCurrentAction(null);
    setSurveyFormData({ ...defaultSurveyFormState });
    setSurveyFormErrors({});
  };

  const isSurveyFormModalOpen = () => currentAction === 'createSurvey';

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
    if (currentAction === 'createSurvey') {
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
    currentAction,
    submitSurveyForm,
    isSubmittingForm,
    updateSurveyList,
    surveys,
    isLoadingSurveys,
    surveyFormErrors
  };
};

// =========================== custom hook ends and page component starts here ==================================

export default function HomePage() {
  const {
    surveyFormErrors,
    isSurveyFormModalOpen,
    isLoadingSurveys,
    surveys,
    updateSurveyList,
    isSubmittingForm,
    currentAction,
    submitSurveyForm,
    surveyFormData,
    closeSurveyFormModal,
    handleCreateSurveyButtonClick,
    handleSurveyFormInputChange
  } = useHomePage();

  useEffect(() => {
    updateSurveyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSurveyList = () => {
    if (isLoadingSurveys) {
      return <p>Loading...</p>;
    }

    if (!surveys.length) {
      return <p>No surveys available</p>;
    }

    return (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase border-b">
            <tr>
              <th className="p-3">Survey Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Company</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey.id} className="border-b">
                <td className="p-3">{survey.name}</td>
                <td className="p-3">{survey.description}</td>
                <td className="p-3">{survey.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className={`${inter.className} container mx-auto pt-10`}>
      <h1 className="text-2xl mb-6">
        Welcome to Re:Co Insights technical test
      </h1>
      <Button
        onClick={() => {
          handleCreateSurveyButtonClick();
        }}
      >
        Create Survey
      </Button>

      {renderSurveyList()}

      <Modal
        label={
          currentAction === 'createSurvey' ? 'Create Survey' : 'Update Survey'
        }
        isOpen={isSurveyFormModalOpen()}
        onRequestClose={closeSurveyFormModal}
      >
        <SurveyForm
          formErrors={surveyFormErrors}
          isSubmiting={isSubmittingForm}
          handleCancelButtonClick={closeSurveyFormModal}
          formData={surveyFormData}
          handleInputChange={handleSurveyFormInputChange}
          handleSubmit={submitSurveyForm}
        />
      </Modal>
    </main>
  );
}
