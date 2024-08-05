type TextInputFieldProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name: string;
  value?: string;
  placeholder?: string;
};

export const TextInputField = ({
  onChange,
  disabled,
  name,
  value,
  placeholder
}: TextInputFieldProps) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      type="text"
      id={name}
      placeholder={placeholder}
      name={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={value}
    />
  );
};
