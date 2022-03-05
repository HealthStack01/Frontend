import { Stack, Tab, Tabs } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';

import StatWrapper from '../helper/CardWrapper';
import AttendCard from '../helper/CardWrapper';
import { ItemWrapper as NavItemWrapper } from '../helper/ItemWrapper';
import { PageText as NavText } from '../helper/PageText';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;500;600;700;800&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');

/* *::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px 12px rgba(0,0,0,0.08);
	border-radius: 8px;
	background-color: #FeFeFe;
} */

*::-webkit-scrollbar{
	display:none
}

/* *::-webkit-scrollbar-thumb{
	border-radius: 2px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #fcfcfc;
} */

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

h1,h2,h3,h4,h5,h6{
  padding: 0;margin: 0
}

h1{ 
  font-size:32px !important;
}

h2{ font-size:24px !important;}


h4{ font-size:18px !important; font-weight:bold !important}

h5{ font-size:16px !important; font-weight:500 !important}

button{
  font-size:14px !important;
  font-weight:600 !important;
}
body{
  width:100vw
  height: 100vh;
  overflow-y:hidden;
  font-size:1rem;


}

label { 
  font-size:0.8rem;
}

p {
  margin:0.6rem 0;
  font-size:0.9rem
}


/* text editor*/
.rs-picker-default .rs-picker-toggle.rs-btn {
    padding-top: 7px;
    padding-bottom: 7px;
    width: 282px;
    position: relative;
    margin-right: 16px;;
}

/* picked date align */
.rs-picker-default .rs-picker-toggle {
    position: relative;
    padding-right: 67px;
    display: inline-block;
    outline: none;
    cursor: pointer;
    color: #575757;
    border: 1px solid #e5e5ea;
    padding-left: 44px;
    z-index:2000;

}
/* calander align */
.rs-picker-toggle-caret {
    display: inline-block;
    margin-: 240px;
    position: absolute;
    top: 8px;
    right: 12px;
    font-weight: 500;
    color: #8e8e93;
}

/* ok button style */
.rs-picker-toolbar-right-btn-ok { 
    text-align: center; 
    cursor: pointer;
    outline: 0 ; 
    border: none; 
    padding: 8px 12px; 
    font-size: 14px; 
    border-radius: 30px;
    color: #fff;
    background-color: #3498ff;
    width: 100px;
}


.rs-picker-menu .rs-calendar .rs-calendar-table-cell-content {
    padding-left: 0;
    padding-right: 0;
    border-radius: 21px;
    display: inline-block;
    position: relative;
    z-index:1000;
 
}

.label-btn{
    padding:0.5rem 1rem;
    border-radius:2px;
    margin-bottom:0.4rem;
    cursor: pointer;
    width:100%;
    font-size:14px;
    font-weight:medium;
    transition: all 0.5s ease-in-out;
    border: 0.1px solid #eee;

  }

.label-btn:hover{
    background:#f2f2f2;
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
<<<<<<< HEAD
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'column')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'flex-start')};
=======
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'column')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'flex-start')};
>>>>>>> 070c9c7b5981f46bee5c2d094075a13df76061cf
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
<<<<<<< HEAD
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '15px')};
=======
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '15px')};
>>>>>>> 070c9c7b5981f46bee5c2d094075a13df76061cf
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 0.5s ease 0s;
<<<<<<< HEAD
  margin-bottom: ${(props) => (props.margingBottom ? props.margingBottom : '30px')};
=======
  margin-bottom: ${(props) => (props.margingBottom ? props.margingBottom : '30px')};
>>>>>>> 070c9c7b5981f46bee5c2d094075a13df76061cf

  &::before {
    content: '';
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    background-image: linear-gradient(to top right, var(--main-color), var(--second-color));
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

export const AttendWrapper = styled(AttendCard)`
  background: ${(props) => (props.background ? props.background : 'white')};
  height: ${(props) => (props.height ? props.height : '120px')};
  widtht: ${(props) => (props.width ? props.width : 'auto')};
  /* width: ${(props) => (props.width ? props.width : '120px')} */
  margin-left: 0.6rem;
  font-size: 12px;
  padding: ${(props) => (props.padding ? props.padding : '1rem')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '4px')};

  /* flex: 1; */
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

export const CustomTabs = styled(Tabs)`
  &::-webkit-scrollbar {
  }
`;

export const CustomTab = styled(Tab)`
  font-size: 12px !important;
  font-weight: 600 !important;
  padding: 0.4rem !important;
`;

export const ImageBox = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 60px;
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  &.between {
    justify-content: space-between;
  }

  &.row {
    flex-direction: row;
    justify-content: space-between;
  }

  & .text {
    /* text-align: center; */
    width: 100%;
    padding: 1rem 2rem;
  }

  &.left {
    align-items: flex-start;
    padding: 1rem 2rem;
  }
`;

export const Htag = styled.h5`
  margin-right: 8rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;
