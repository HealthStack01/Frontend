import React from "react";
import { StartCardContainer } from "../../styles";

interface StatProps {
  count: any;
  name: string;
  range: string;
  icon: string;
}

const StatCard: React.FC<StatProps> = ({
  count = 14,
  name = "Appointments",
  icon = "bi bi-calendar",
  range = "month",
}) => {
  return (
    <StartCardContainer>
      <div className="inner-section">
        <div className="icon-container">
          <i className={icon}></i>
        </div>
        <div>
          <h1>{count}</h1>
          <h4>{name}</h4>
          <small>This {range}</small>
        </div>
      </div>

      <span className="percent-container">2%</span>
    </StartCardContainer>
  );
};

export default StatCard;
