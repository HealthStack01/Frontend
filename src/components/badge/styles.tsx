import styled from 'styled-components';

export const BadgeSpan = styled.span`
  padding: 6px 11px;
  color: #fff;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &.danger {
    background: #fb0b12;
  }

  &.success {
    background: #019707;
  }

  &.primary {
    background: #349eff;
  }

  &.warning {
    background: #d68102;
  }
`;
