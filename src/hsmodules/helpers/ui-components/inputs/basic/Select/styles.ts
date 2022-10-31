import styled from 'styled-components';

export const SelectField = styled.select`
  padding: 0.9rem;
  height: 50px;
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.grayTwo};
  width: 100% !important;
`;

export const DropDownHeader = styled('div')``;
export const DropDownListContainer = styled('div')``;
export const DropDownList = styled('ul')``;
export const ListItem = styled('li')`
  width: 100%;
`;
