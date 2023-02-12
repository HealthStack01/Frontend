import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const InputField = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.4rem 1rem;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.grayTwo};
  border-color: ${(props: { error: boolean }) =>
    props.error ? "#d32f2f" : ""};
  color: #000000;
  font-size: 0.85rem;
  &:hover {
    border: 1px solid #000000;
    border-color: ${(props: { error: boolean }) =>
      props.error ? "#d32f2f" : ""};
  }
  &:focus {
    border: 2px solid #3779eb;
    border-color: ${(props: { error: boolean }) =>
      props.error ? "#d32f2f" : ""};
  }

  &:focus + label {
    /* top: -0.5rem;
    left: 0.8rem; */
    color: #3779eb;
    font-weight: 500;
    z-index: 10;
  }

  &:not(placeholder-shown).&:not(:focus) + label {
    top: -0.5rem;
    left: 0.8rem;
    font-size: 0.75rem;
    font-weight: 500;
    z-index: 10;
  }
`;

export const InputBox = styled.div`
  position: relative;

  height: 2.2rem;
  width: 100%;

  text-align: left;
  & i {
    position: absolute;
    right: 0.4rem;
    top: 0.12rem;
    font-size: 22px;
    padding: 0.25rem;
    transition: 0.4s;
    display: flex;
    alignitems: center;
  }
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
  font-size: 0.8rem !important;
  color: ${(props: { error: boolean }) => (props.error ? "#d32f2f" : "")};
`;

export const BlueInputField = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.9rem;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.grayTwo};
  width: 100%;
  &:focus + label {
    /* top: -0.5rem;
    left: 0.8rem; */
    color: ${({ theme }) => theme.blueTwo};
    font-weight: 500;
    z-index: 10;
  }
  &:not(placeholder-shown).&:not(:focus) + label {
    top: -0.5rem;
    left: 0.8rem;
    font-size: 0.75rem;
    font-weight: 500;
    z-index: 10;
  }
`;

export const BlueInputBox = styled.div`
  position: relative;
  height: 2rem;
  width: 100%;

  text-align: left;
  & i {
    position: absolute;
    right: 1rem;
    top: 0.25rem;
    font-size: 22px;
    padding: 0.25rem;
    transition: 0.4s;
  }
`;

export const BlueInputLabel = styled.label`
  position: absolute;
  /* left: 1rem;
  top: 1rem; */
  top: -0.5rem;
  left: 0.8rem;
  padding: 0 0.25rem;
  background-color: #fff;
  transition: 0.4s;
  color #0064cc; 
`;
