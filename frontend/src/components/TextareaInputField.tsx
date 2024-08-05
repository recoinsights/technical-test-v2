type TextareaInputFieldProps = {
  name: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextareaInputField = ({
  disabled,
  onChange,
  name,
  value
}: TextareaInputFieldProps) => {
  return (
    <textarea
      disabled={disabled}
      onChange={onChange}
      id={name}
      name={name}
      value={value}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  );
};
