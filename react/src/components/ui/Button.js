import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'medium', onClick, disabled = false, fullWidth = false }) => {
  const className = `vk-button vk-button--${variant} vk-button--${size} ${fullWidth ? 'vk-button--full-width' : ''}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
