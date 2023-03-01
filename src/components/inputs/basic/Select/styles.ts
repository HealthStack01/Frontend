import styled from "styled-components";

export const SelectField = styled.select`
  border-radius: 4px;
  border: 1.5px solid ${({theme}) => theme.grayTwo};
  width: 100% !important;
`;

export const DropDownHeader = styled("div")``;
export const DropDownListContainer = styled("div")``;
export const DropDownList = styled("ul")``;
export const ListItem = styled("li")`
  width: 100%;
`;

export const InputLabel = styled.label`
  position: absolute;
  /* left: 1rem;
  top: 1rem; */
  top: -0.5rem;
  left: 0.8rem;
  padding: 0 0.25rem;
  background-color: #fff;
  transition: 0.4s;
  font-size: 0.7rem !important;
`;
