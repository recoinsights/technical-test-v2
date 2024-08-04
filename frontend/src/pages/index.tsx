import { Inter } from 'next/font/google';
import { useHomePage } from '@/hooks/useHomePage';
import _Modal from 'react-modal';
import { Modal } from '@/components/modal';
import { SurveyForm } from '@/components/surveyForm';
import { Button } from '@/components/button';
import { useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] });

_Modal.setAppElement('#__next');

export default function Home() {
  const {
    isSurveyFormModalOpen,
    isLoadingSurveys,
    surveys,
    updateSurveyList,
    isSubmittingForm,
    activeAction,
    submitSurveyForm,
    surveyFormData,
    closeSurveyFormModal,
    handleCreateSurveyButtonClick,
    handleSurveyFormInputChange
  } = useHomePage();

  useEffect(() => {
    updateSurveyList();
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
          activeAction === 'createSurvey' ? 'Create Survey' : 'Update Survey'
        }
        isOpen={isSurveyFormModalOpen()}
        onRequestClose={closeSurveyFormModal}
      >
        <SurveyForm
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
