import React from 'react';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
};

export const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ variant, fullWidth, ...props }) => <button {...props} />;
Button.displayName = 'Button';
