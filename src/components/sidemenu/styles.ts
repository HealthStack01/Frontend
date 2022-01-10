import styled from 'styled-components';

export const Sidemenu = styled.div`
&.side-menu
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  width: 300px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2rem 1.5rem ;
  transition: width 0.2s ease-in;

  &.side-menu.inactive {
    width: 80px;
  }
`;

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & h1 {
    color: ${({ theme }) => theme.btnText};
    font-size: 20px;
  }
`;

export const TogglemenuBtn = styled.div`
  color: ${({ theme }) => theme.btnText};
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
    overflow-y: auto;
    height: 100%;
  }

  &.main-menu::-webkit-scrollbar {
  display: none;
} {}

  &.main-menu .menu-item {
    color: ${({ theme }) => theme.btnText};
    text-decoration: none;
    font-size: 15px;
    display: block;
    font-weight: 600;
    cursor: pointer;
  }
  &.main-menu .menu-item.active {
    background: ${({ theme }) => theme.blueTwo};
    border-radius: 5px;
    color: #fff;
  }
`;
