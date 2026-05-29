import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  ariaLabel?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
}) => {
  const baseClasses =
    'px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  const variantClasses =
    variant === 'primary'
      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
      : 'bg-white/10 text-white border-white/20 hover:bg-white/20';
  const combined = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={combined}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} aria-label={ariaLabel} className={combined}>
      {children}
    </button>
  );
};
