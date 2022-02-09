import { styled } from '@mui/material/styles';

import BaseButton from '.';

export const CustomButton = styled(BaseButton)`
  width: ${(props) => (props.fullwidth ? '100%' : 'auto')};
  color: ${(props) => (props.color ? props.color : '#FFF')};
  background: ${(props) => (props.background ? props.background : '#0364FF')};
  padding: 1rem;
  margin: 0 0.4rem;
  border: 0;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:focus {
    outline: 2px solid blue;
  }
`;
