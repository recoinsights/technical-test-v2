import { Button } from './button';

export type SurveyForm = {
  name: string;
  description: string;
  company: string;
};

type SurveyFormProps = {
  formData: SurveyForm;
  handleInputChange: <T extends keyof SurveyForm>(
    name: T,
    value: SurveyForm[T]
  ) => void;
  handleSubmit: () => Promise<void>;
  handleCancelButtonClick: () => void;
  formErrors: Record<string, string | null>;
  isSubmiting: boolean;
};

export const SurveyForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  handleCancelButtonClick,
  isSubmiting,
  formErrors
}: SurveyFormProps) => {
  const renderFieldError = (fieldName: string) => {
    if (!formErrors[fieldName]) {
      return null;
    }

    return (
      <div className={'text-sm text-red-500 block'}>
        {formErrors[fieldName]}
      </div>
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="mb6">
        <label htmlFor="name" className="block mb-2 text-gray-900">
          Name
        </label>
        <div>
          <input
            disabled={isSubmiting}
            onChange={(e) => {
              handleInputChange('name', e.target.value);
            }}
            type="text"
            id="name"
            name={formData.name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        {renderFieldError('name')}
      </div>
      <div className="mt-3">
        <label htmlFor="description" className="block mb-2 text-gray-900">
          Description
        </label>
        <textarea
          disabled={isSubmiting}
          onChange={(e) => {
            handleInputChange('description', e.target.value);
          }}
          id="description"
          name="description"
          value={formData.description}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {renderFieldError('description')}
      </div>
      <div className="mt-3">
        <label htmlFor="company" className="block mb-2 text-gray-900">
          Company
        </label>
        <input
          disabled={isSubmiting}
          onChange={(e) => {
            handleInputChange('company', e.target.value);
          }}
          type="text"
          id="company"
          name="company"
          value={formData.company}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {renderFieldError('company')}
      </div>
      <div className="mt-3 text-right">
        <Button
          disabled={isSubmiting}
          type="button"
          theme="secondary"
          onClick={() => {
            handleCancelButtonClick();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isSubmiting} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
