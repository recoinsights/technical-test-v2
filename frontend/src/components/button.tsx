type CommonButtonProps = {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary';
  disabled?: boolean;
};

type EventableButtonProps = CommonButtonProps & {
  type?: 'button' | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type SubmitButtonProps = CommonButtonProps & {
  type: 'submit' | 'reset';
};

type ButtonProps = EventableButtonProps | SubmitButtonProps;

const secondaryButtonStyleClass =
  'focus:outline-none text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2';
const primaryButtonStyleClass =
  'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900';

export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      onClick={
        !props.type || props.type === 'button' ? props.onClick : undefined
      }
      type={props.type ?? 'button'}
      className={
        props.theme === 'secondary'
          ? secondaryButtonStyleClass
          : primaryButtonStyleClass
      }
    >
      {props.children}
    </button>
  );
};
