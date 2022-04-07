import styled from 'styled-components';

export const SearchBox = styled.div`
  position: relative;
  width: 42px;
  transition: 0.4s;

  &:hover,
  &:active {
    width: 350px;
  }
  &:hover input,
  &:active input {
    width: 100%;
  }

  & i {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: ${({ theme }) => theme.grayTwo};
    transition: 0.4s;
  }

  &:hover i {
    opacity: 0;
    z-index: -1;
  }
`;

export const SearchField = styled.input`
  width: 42px;
  height: 42px;
  background: none;
  border-radius: 50px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.grayTwo};
  outline: none;
  transition: 0.5s;
  padding: 0.9rem;
  height: 42px;
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.grayTwo};
  width: 100%;

  &:focus {
    border: 2px solid ${({ theme }) => theme.blueTwo};
  }
`;
