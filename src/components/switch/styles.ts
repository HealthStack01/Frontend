import styled from 'styled-components';

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 0;
  height: 0;
  visibility: hidden;

  &:checked + label:after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
    display: grid;
    place-items: center;
    content: 'G';
  }

  &:checked + label {
    background-color: transparent;
    border: 1.4px solid #0364ff;
  }
`;

export const CheckboxLabel = styled.label`
  display: block;
  max-width: 140px;
  width: 120px;
  height: 40px;
  background-color: transparent;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
  border: 1.4px solid #0364ff;
  ${({ color }) => color && `color: ${color};`}
  &::after {
    content: 'L';

    font-weight: bold;
    display: grid;
    place-items: center;
    width: 36px;
    height: 34px;
    background-color: rgba(0, 100, 204, 0.16);
    position: absolute;
    border-radius: 4px;
    top: 2px;
    left: 2px;
    transition: 0.5s;
  }

  &:active:after {
    width: 22px;
  }
`;
