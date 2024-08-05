import { Button } from './Button';
import { TextareaInputField } from './TextareaInputField';
import { TextInputField } from './TextInputField';

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
          <TextInputField
            name={'name'}
            placeholder={'Eg. Test survey 1'}
            value={formData.name}
            onChange={(e) => {
              handleInputChange('name', e.target.value);
            }}
            disabled={isSubmiting}
          />
        </div>
        {renderFieldError('name')}
      </div>
      <div className="mt-3">
        <label htmlFor="description" className="block mb-2 text-gray-900">
          Description
        </label>
        <TextareaInputField
          name="description"
          placeholder="Eg. This is a test survey"
          value={formData.description}
          onChange={(e) => {
            handleInputChange('description', e.target.value);
          }}
          disabled={isSubmiting}
        />
        {renderFieldError('description')}
      </div>
      <div className="mt-3">
        <label htmlFor="company" className="block mb-2 text-gray-900">
          Company
        </label>
        <TextareaInputField
          name="company"
          placeholder="Eg. Test company"
          value={formData.company}
          onChange={(e) => {
            handleInputChange('company', e.target.value);
          }}
          disabled={isSubmiting}
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
