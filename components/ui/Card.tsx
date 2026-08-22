import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, footer, className = '' }: CardProps) {
  return (
    <div className={`bg-surface-container-lowest border border-outline-variant/60 rounded-none p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      {title && <div className="mb-4 text-lg font-bold text-on-surface">{title}</div>}
      <div className="text-on-surface-variant">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
