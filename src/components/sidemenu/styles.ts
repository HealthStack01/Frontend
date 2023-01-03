import styled from "styled-components";

export const Sidemenu = styled.div`
&.hide{
    left: -300px;
    width: 0;
    padding: 0;

    @media (max-width: 768px) {
    left: 0;
    width: 300px;
    padding: 1.5rem 1rem ;

  }
  
  }
&.side-menu
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  background: ${({theme}) => theme.primary};
  color: ${({theme}) => theme.btnText};
  width: 300px;
  height: 100vh;
  box-sizing: border-box;
  padding: 1.5rem 1rem ;
  transition: width 0.2s ease-in;
  

  @media (max-width: 768px) {
    left: -300px;
    width:0;
    padding:0;
  }

  

  &.side-menu.inactive {
    width: 80px;
  }
`;

export const TopSection = styled.div`
  display: flex;
  align-items: center;

  & h1 {
    color: ${({theme}) => theme.btnText};
    font-size: 20px;
  }
`;

export const TogglemenuBtn = styled.div`
  color: ${({theme}) => theme.btnText};
  font-size: 20px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const MainMenu = styled.div`
  &.main-menu {
    margin: 1rem 0;
    position: relative;
    overflow-x: hidden;
    height: 100%;
    overflow-y: auto;
  }

  &.main-menu.dark::-webkit-scrollbar {
    width: 7px;
  }

  &.main-menu::-webkit-scrollbar {
    width: 7px;
  }

  &.main-menu::-webkit-scrollbar-track {
    background: ${({theme}) => theme.primary};
  }

  &.main-menu::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 4px;
    border: 1px solid #fff;
  }

   {
  }

  &.main-menu .menu-item {
    color: ${({theme}) => theme.btnText};
    text-decoration: none;
    font-size: 15px;
    display: block;
    font-weight: 600;
    cursor: pointer;
  }
  &.main-menu .menu-item.active {
    background: ${({theme}) => theme.blueTwo};
    border-radius: 5px;
    color: #fff;
  }
`;
