import { Link as LinkRef } from 'react-router-dom';
import styled from 'styled-components';

export const Lists = styled.ul`
  padding: 0;
  margin: 0;

  &.sub-menu {
    color: #333;
    margin-left: 20px;
    border-left: 1px dashed ${({ theme }) => theme.btnText};
    box-sizing: border-box;
    padding-left: 30px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-in;
  }
  &.sub-menu.active {
    max-height: 200px;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  padding: 0.8rem;
`;

export const Link = styled(LinkRef)`
  &.menu-item {
    color: ${({ theme }) => theme.btnText};
    text-decoration: none;
    font-size: 15px;
    display: block;
    font-weight: 600;
    cursor: pointer;
    padding: 0.8rem;
  }
  &.menu-item.active {
    background: ${({ theme }) => theme.primary};
    border-radius: 5px;
    color: #fff;
  }

  &.menu-item .menu-label {
    display: flex;
    justify-content: space-between;
  }

  &.menu-item .menu-icon {
    display: inline-block;
    width: 40px;
    font-size: 20px;
    text-align: center;
  }
`;
