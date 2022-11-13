import {Stack, Tab, Tabs} from "@mui/material";
import styled, {createGlobalStyle} from "styled-components";

import StatWrapper from "../../components/CardWrapper";
import {ItemWrapper as NavItemWrapper} from "../../components/ItemWrapper";
import {PageText as NavText} from "../../components/PageText";

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

.react-datepicker-popper {
  z-index: 999999 !important;
}

.MuiInputBase-input {
  height: 2rem !important;
}

*.dark::-webkit-scrollbar {
  width: 0.5rem;
}

*::-webkit-scrollbar {
  width: 0.5rem;
}

*::-webkit-scrollbar-track {
  background: inherit;
}

*::-webkit-scrollbar-thumb {
  background-color: inherit;
  border-radius: 0.25rem;
  border: 0.2rem solid gray;
  background-color : gray;
}

html{
  scroll-behavior: smooth;

}
#root{
    margin:0 auto;
}

h1,h2,h3,h4,h5,h6{
  padding: 0;margin: 0
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
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    width: 17.625REM;
    position: relative;
    margin-right: 1rem;;

    @media(max-width: 768px){
      width:100%;
      display:none;
    }
}

/* picked date align */
.rs-picker-default .rs-picker-toggle {
    position: relative;
    padding-right: 4.2rem;
    display: inline-block;
    outline: none;
    cursor: pointer;
    color: #575757;
    border: 1px solid #e5e5ea;
    padding-left: 2.75rem;
    z-index:2000;

}
/* calander align */
.rs-picker-toggle-caret {
    display: inline-block;
    margin-: 15rem;
    position: absolute;
    top: 0.5rem;
    right: .67rem;
    font-weight: 500;
    color: #8e8e93;
}

/* ok button style */
.rs-picker-toolbar-right-btn-ok { 
    text-align: center; 
    cursor: pointer;
    outline: 0 ; 
    border: none; 
    padding: 0.5rem 0.67rem; 
    font-size: .9rem; 
    border-radius: 2rem;
    color: #fff;
    background-color: #3498ff;
    width: 6.25rem;
}


.rs-picker-menu .rs-calendar .rs-calendar-table-cell-content {
    padding-left: 0;
    padding-right: 0;
    border-radius: 1.3rem;
    display: inline-block;
    position: relative;
    z-index:1000;
 
}

.label-btn{
    padding:0.5rem 1rem;
    border-radius:.125rem;
    margin-bottom:0.4rem;
    cursor: pointer;
    width:100%;
    font-size:.9rem;
    font-weight:medium;
    transition: all 0.5s ease-in-out;
    border: 0.1px solid #eee;

  }

.label-btn:hover{
    background:#f2f2f2;
  }

  @keyframes divanimation {
    from {
      width: 0%;
      opacity:0;
    }
    to {
      width: 100%;
      opacity:1;
    }
  }

  /*Input focus sticky top label*/
.form__input:not(:placeholder-shown).form__input:not(:focus)+ .form__label{
  top: -.5rem;
  left: .8rem;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 10;
}
`;

export const PlacementWrapper = styled.div`
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  transition: width 2s, height 4s;
`;

export const ContentWrapper = styled.div`
  background: #fff;
  border: 0.1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  transition: width 2s, height 4s;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${({theme}) => theme.text};
  background: ${({theme}) => theme.background};

  &.center {
    display: flex;
    place-items: center;
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.btnText};
  }

  & .text-center {
    text-align: center;
    

    & h2 {
      display:block ;
      text-align:center
      font-size: 3rem;
      margin-bottom:1rem
    }
  }

  
  
`;

export const Text = styled(NavText)`
  color: ${props => (props.color ? props.color : "#ffffff")};
  font-size: ${props => (props.fontSize ? props.fontSize : ".9em")};
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
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : "column"};
  align-items: ${props => (props.alignItems ? props.alignItems : "flex-start")};
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
  padding: ${props => (props.padding ? props.padding : "2rem")};
  display: flex;
  align-items: ${props => (props.alignItems ? props.alignItems : "center")};
  background: ${({theme}) => theme.background};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "1rem")};
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 0.5s ease 0s;
  margin-bottom: ${props =>
    props.margingBottom ? props.margingBottom : "2rem"};

  &::before {
    content: "";
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

export const UserWrapper = styled.div`
  display: flex;
  justifycontent: flex-start;
  overflow: auto;
`;

export const AttendWrapper = styled(StatWrapper)`
  background: ${props => (props.background ? props.background : "white")};
  height: ${props => (props.height ? props.height : "7.5rem")};
  widtht: ${props => (props.width ? props.width : "auto")};
  /* width: ${props => (props.width ? props.width : "120px")} */
  margin-left: 0.6rem;
  font-size: 12px;
  padding: ${props => (props.padding ? props.padding : "1rem")};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "4px")};

  /* flex: 1; */
`;
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background: ${({theme}) => theme.btnText};
`;

export const TableMenu = styled.div`
  width: 100%;
  height: 60px;
  margin: 0rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .inner-table {
    width:100%,
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 400px) {
      width: 100%;
    }

    & input {
      margin-right: 1rem;
    }
    & span {
      margin-left: 1rem;
      font-size: 1rem;
      font-weight: bold;
      width: 300px;
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;
    height: auto;
    & button {
      width: 100%;
      margin: 10px 0 6px;
    }
  }
`;

export const CustomStack = styled(Stack)`
  margin: 2rem 0;
  width: 25rem;

  @media (max-width: 768px) {
    width: 18.75rem;
  }
`;

export const CustomTabs = styled(Tabs)`
  &::-webkit-scrollbar {
  }
`;

export const CustomTab = styled(Tab)`
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  padding: 0.4rem !important;
`;

export const ImageBox = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 3.75rem;
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;

  & img {
    width: 9.375rem;
    height: 9.375rem;
    border-radius: 9.375rem;
  }

  @media (max-width: 400px) {
  }

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
    padding: 0.4rem 1rem;
  }

  &.left {
    align-items: flex-start;
    padding: 1rem;
  }

  &.align-left {
    align-items: flex-start;
  }
`;

export const Htag = styled.h5`
  margin-right: 8rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  & button {
    margin-right: 4px;
  }

  @media (max-width: 400px) {
    flex-direction: column;
    margin-top: 1rem;
    width: 100%;

    & button {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;

export const LocationWrapper = styled.div`
  width: 15rem;
  margin-right: 0.8rem;
  position: relative;
  z-index: 1000;

  @media (max-width: 400px) {
    width: 25rem !important;
  }
  & button {
    @media (max-width: 400px) {
      width: 12.5rem !important;
    }
  }
`;

export const LocationCardWrapper = styled.div`
  margin: 0.7rem 0;
  border: 0.6px solid #ebebeb;
  background: #fafafa;
  padding: 1rem;
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;
