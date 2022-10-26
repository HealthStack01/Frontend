import styled from 'styled-components';

export const SearchBox = styled.div`
  position: relative;
  width: 42px;
  transition: 0.4s;

  /* @media (max-width: 768px) {
    &:active {
      width: 200px;
    }
  } */

  &.auto-search {
    width: 100%;
    margin: 10px 0;
  }
  &.auto-search input {
    padding-left: 40px;
  }
  &.auto-search:active,
  &.auto-search:hover,
  &.auto-search:active input {
    width: 100%;
  }
  &:hover,
  &:active {
    width: 12rem;
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

  &.auto-search:hover i {
    opacity: 1;
    z-index: 3;
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
  background: #fff;
  border: 1.5px solid ${({ theme }) => theme.grayTwo};
  width: 100%;

  &:focus {
    border: 2px solid ${({ theme }) => theme.blueTwo};
  }
`;
