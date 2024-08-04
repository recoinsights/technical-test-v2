import _Modal from 'react-modal';

/**
 * @note - do not worry about styling or customizing the look and feel of the modal
 */
const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '400px'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  label?: string;
  children: React.ReactNode;
};

export const Modal = ({
  isOpen,
  onRequestClose,
  children,
  label
}: ModalProps) => {
  return (
    <_Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={styles}
      contentLabel={label}
    >
      {children}
    </_Modal>
  );
};
