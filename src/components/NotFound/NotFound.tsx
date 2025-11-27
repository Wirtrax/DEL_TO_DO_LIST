import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './NotFoundStyle.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }, []);
  return (
    <div className={styles.notFound}>
      <h1>404 - PAGE NOT FOUND </h1>
    </div>
  );
};

export default NotFound;
