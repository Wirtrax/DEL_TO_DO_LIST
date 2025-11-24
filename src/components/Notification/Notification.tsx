import styles from './NotificationStyles.module.css';
interface NotificationProps {
  label: string;
  status: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ label, status }) => {
  const notificationClasses = [styles.notification, status == 'success' ? styles.success : styles.error]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={notificationClasses}>
      <span>{status == 'success' ? 'svgS' : 'svgE'}</span>
      <span>{label}</span>
    </div>
  );
};

export default Notification;
