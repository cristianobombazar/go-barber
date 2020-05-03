import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string /* allow styles from parent component */;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children, className }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title} </span>
    </Container>
  );
};

export default Tooltip;
