import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export default function Button({
}: ButtonProps) {
  return (
    <button
      className={[styles.button, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
