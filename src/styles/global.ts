import { Stack } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';

import StatWrapper from '../helper/CardWrapper';
import { ItemWrapper as NavItemWrapper } from '../helper/ItemWrapper';
import { PageText as NavText } from '../helper/PageText';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;500;600;700;800&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');
*{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    scroll-behavior: smooth;
    font-family: 'Manrope', sans-serif;
}
#root{
    margin:0 auto;
}

body{
  width:100vw
  height: 100vh;
  overflow-y:hidden

}

p {
  margin:0.6rem 0;
}
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};

  &.center {
    display: flex;
    place-items: center;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.btnText};
  }

  & .text-center {
    text-align: center;
    

    & h2 {
      display:block ;
      text-align:center
      font-size: 48px;
      margin-bottom:1rem
    }
  }
`;

export const Text = styled(NavText)`
  color: ${(props) => (props.color ? props.color : '#ffffff')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '.9em')};
  margin-right: 1em;
  border: 1px solid #232f3e;
  padding: 0.5em 0.1em;
  cursor: pointer;

  &:hover {
    border: 1px solid #ffffff;
    border-radius: 0.2em;
  }
  @media (max-width: 850px) {
    display: none;
  }
`;
export const LeftText = styled(Text)`
  @media (max-width: 850px) {
    display: block;
  }
`;

export const Wrapper = styled(NavItemWrapper)`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'column'};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : 'flex-start'};
  padding: 0.1em;
  cursor: pointer;
  border: 1px solid #131a22;

  &:hover {
    border: 1px solid #ffffff;
    border-radius: 0.2em;
  }
  @media (max-width: 850px) {
    display: none;
  }
`;

export const Stat = styled(StatWrapper)`
  padding: ${(props) => (props.padding ? props.padding : '30px')};
  display: flex;
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  background: ${({ theme }) => theme.background};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '15px'};
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 0.5s ease 0s;
  margin-bottom: ${(props) =>
    props.margingBottom ? props.margingBottom : '30px'};

  &::before {
    content: '';
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    background-image: linear-gradient(
      to top right,
      var(--main-color),
      var(--second-color)
    );
    position: absolute;
    left: -50%;
    top: 0;
    transform: scale(0);
    transition: transform 0.8s ease 0s;
  }
  &:hover::before {
    transform: scale(3);
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background: ${({ theme }) => theme.btnText};
`;

export const TableMenu = styled.div`
  width: 100%;
  height: 60px;
  margin: 2rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .inner-table {
    display: flex;
    align-items: center;

    & input {
      margin-right: 1rem;
    }
    & span {
      margin-left: 1rem;
      font-size: 1rem;
      font-weight: bold;
      width: 100px;
    }
  }
`;

export const CustomStack = styled(Stack)`
  margin: 2rem 0;
  width: 400px;

  @media (max-width: 768px) {
    width: 300px;
  }
`;

export const ImageBox = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  &.between {
    justify-content: space-between;
  }
`;

export const Htag = styled.h5`
  margin-right: 8rem;
`;
