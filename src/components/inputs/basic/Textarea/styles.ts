import styled from "styled-components";

export const TextareaField = styled.textarea<any>`
  padding: 0.9rem;
  width: 100%;
  min-height: 6rem;
  font-size: 0.85rem;
  border-radius: 4px;
  border: 1.5px solid
    ${({theme, errorText}) => (!errorText ? theme.grayTwo : "red")};
  width: 100%;
  resize: none;
  &:hover {
    border: 1px solid #000000;
  }
  &:focus {
    border: 2px solid #3779eb;
  }
  &:disabled {
    color: #000000;
  }
`;
