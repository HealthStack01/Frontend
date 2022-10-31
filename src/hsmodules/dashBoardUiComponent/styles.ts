import styled from "styled-components";
import Accordion from "./Accordion";
import BaseButton from "./BaseButton";

export const InputField = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1.1rem 2rem;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  border: 1.5px solid #eee;

  &:focus {
    border: 2px solid #0364ff;
  }

  &:focus + label {
    top: -0.5rem;
    left: 0.8rem;
    color: #0364ff;
    font-weight: 500;
    z-index: 10;
  }
  &:not(placeholder-shown).&:not(:focus) + label {
    top: -0.5rem;
    left: 0.8rem;
    font-size: 1rem;
    font-weight: 500;
    z-index: 10;
  }
`;

export const InputBox = styled.div`
  position: relative;
  height: 52px;
  width: 100%;
  margin: 0.75rem 0;
  text-align: left;

  & i {
    position: absolute;
    right: 0.6rem;
    top: 0.6rem;
    font-size: 22px;
    padding: 0.25rem;
    transition: 0.4s;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  left: 1rem;
  top: 1rem;
  padding: 0 0.25rem;
  background-color: #fff;
  transition: 0.4s;
`;

// Button

export const Button = styled(BaseButton)`
  width: ${(props) => (props.fullwidth ? "100%" : "auto")};
  color: ${(props) => (props.color ? props.color : "#FFF")};
  background: ${(props) => (props.background ? props.background : "#0364FF")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap !important;
  align-items: center;
  padding: 1.5rem 0.6rem;
  margin: 0 0.2rem;
  border: 0;
  font-size: 80%;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  height: 40px;

  &:focus {
    outline: 1px solid #eee;
  }

  & i {
    padding-right: 10px;
  }

  @media (max-width: 768px) {
    & i {
      display: none;
    }
    width: 100%;
  }
`;

// Textarea

export const TextareaField = styled.textarea<any>`
  padding: 0.9rem;
  width: 100%;
  height: 120px;
  border-radius: 4px;
  border: 1.5px solid
    ${({ theme, errorText }) => (!errorText ? theme.grayTwo : "red")};
  width: 100%;
`;

export const LayoutWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const LayoutContent = styled.div`
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;

  .layout {
    height: 100%;
  }
`;

export const StartCardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  background: #f8f8f8;
  border-radius: 8px;
  width: 100%;
  margin: 0 10px 10px 0;

  .inner-section {
    background: "#33415C";
    padding: 8px;
    border-radius: 16px;
    color: #000;
    display: flex;
    align-items: center;

    .icon-container {
      margin-right: 24px;

      i {
        font-size: 32px;
      }
    }
    @media (max-width: 400px) {
      padding: 10px;
    }
  }
  .percent-container {
    padding: 6px 10px;
    border-radius: 4px;
    background: #c2f5df;
  }
`;

export const DetailsWrapper = styled(Accordion)`
  width: 100%;
  background: ${({ theme }) => "theme.neutralwhite"};
  padding: 2rem;
  border-radius: 4px;
  margin-top: 2rem;
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;

  & h2 {
    font-size: 1.2rem;
    font-weight: bolder;
    padding: 1.2rem 0 2.4rem;
  }
  & span {
    font-weight: bold;
    cursor: pointer;
  }

  @media (max-width: 400px) {
    padding: 0.75rem;
  }
`;

export const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  margin-top: 2rem;

  &.long {
    @media (max-width: 400px) {
      padding-top: 4rem;
    }
  }
  & button {
    margin-left: 1rem;
  }
  @media (max-width: 400px) {
    flex-direction: column;
    margin-top: 4rem;
    height: auto;

    & button {
      width: 100%;
      margin: 0;
      margin-top: 1rem;
    }
  }
`;

export const FullDetailsWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme["neutralwhite"]};
  padding: 0.55rem;
  border-radius: 4px;
  margin-top: 1rem;
  transition: width 2s, height 4s;
  overflow-y: scroll;
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;

  & h2 {
    font-size: 1.2rem;
    font-weight: bolder;
    padding: 1.2rem 0 2.4rem;
  }
  & span {
    font-weight: bold;
    cursor: pointer;
  }

  &.small {
    width: 100%;
    padding: 32px 8px !important;
    border: 0.1px solid #eee;
  }

  &.attend {
    height: 100%;
    border: 0.12px solid #f1f1f1;
    margin-right: 1rem;
  }

  &.attend-small {
    flex: 0.2;
    width: 20%;
    min-width: 240px;
  }

  &.attend-medium {
    flex: 1;
    max-width: 50%;
    /* width: 40%; */
  }

  &.attend-large {
    flex: 1.5;
  }
`;
