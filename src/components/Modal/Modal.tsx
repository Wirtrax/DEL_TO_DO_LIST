import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from './ModalOverlay';
import styles from './Modal.module.css';
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key == 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} data-testid="modal-container">
        <button className={styles.closeButton} onClick={onClose} data-testid="modal-close-button">
          <svg width="48" height="48" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
              fill="#ffffffff"></path>
          </svg>
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('root-modal') as HTMLElement
  );
};

export default Modal;
