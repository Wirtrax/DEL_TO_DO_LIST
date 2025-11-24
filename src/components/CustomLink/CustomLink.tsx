import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomLinkStyles.module.css';

interface CustomLinkProps {
  to: string;
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
  replace?: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  label,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  replace = false,
}) => {
  const linkClasses = [styles.customLink, styles[variant], styles[size], fullWidth ? styles.fullWidth : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Link to={to} className={linkClasses} replace={replace}>
      {label}
    </Link>
  );
};

export default CustomLink;
