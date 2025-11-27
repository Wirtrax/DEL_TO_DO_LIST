import styles from './NotificationStyles.module.css';

interface NotificationProps {
  label: string;
  status: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ label, status }) => {
  const notificationClasses = [styles.notification, status == 'success' ? styles.success : styles.error]
    .filter(Boolean)
    .join(' ');

  const SuccessIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 10L9 13L14 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  const ErrorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={notificationClasses}>
      <span className={styles.icon}>{status == 'success' ? <SuccessIcon /> : <ErrorIcon />}</span>
      <span>{label}</span>
    </div>
  );
};

export default Notification;
