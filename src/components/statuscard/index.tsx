import React from 'react';
import { Stat } from '../../styles/global';

interface StatusProps {
  icon: string;
  count: any;
  title: string;
}

const StatusCard: React.FC<StatusProps> = ({ icon, count, title }) => {
  return (
    <Stat>
      <div className='status-card__icon'>
        <i className={icon}></i>
      </div>
      <div className='status-card__info'>
        <h4>{count}</h4>
        <span>{title}</span>
      </div>
    </Stat>
  );
};

export default StatusCard;
