import styled from 'styled-components';

import BaseButton from '.';

export const CustomButton = styled(BaseButton)`
  width: ${props => (props.fullwidth ? '100%' : 'auto')};
  color: ${props => (props.color ? props.color : '#FFF')};
  /* background: ${({ theme }) => theme.blueTwo}; */
  background: ${props => (props.background ? props.background : '#0364FF')};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0 0.4rem;
  border: 0;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:focus {
    outline: 2px solid blue;
  }

  & i {
    padding-right: 10px;
  }
`;
