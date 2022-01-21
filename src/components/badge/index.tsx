import React from 'react';

import { BadgeSpan } from './styles';

interface BadgeProps {
  content?: string;
  type?: 'danger' | 'success' | 'primary' | 'warning';
}

const Badge: React.FC<BadgeProps> = ({ content, type = 'primary' }) => (
  <BadgeSpan className={`${type}`}>{content}</BadgeSpan>
);

export default Badge;
