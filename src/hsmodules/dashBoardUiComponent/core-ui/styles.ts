import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
`;

export const AuthContainer = styled.div`
  width: 65%;
  height: 100vh;
  padding: 4% 1rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  overflow: hidden;
  text-align: center;
  @media (max-width: 876px) {
    width: 100%;
  }

  & .aside-container {
    height: calc(100vh - 16%);
    padding: 10% 1rem;
  }

  & h2 {
    margin-bottom: 10px;
  }

  & .aside-child {
    width: 400px;
    margin-top: 3rem;
    @media (max-width: 400px) {
      width: 350px;
    }
  }

  & form {
    text-align: left;
  }

  & .bottom-center {
    text-align: center;
    margin-top: 3rem !important;

    a {
      display: inline-block;
      padding: 0.8rem;
      background: #f2f2f2;
      border-radius: 4px;
      margin-right: 1rem;
      margin-top: 1rem;

      &:hover {
        background: #f1f1f1;
      }
      & i {
        color: #aaa;
        font-size: 1.2rem;
      }
    }
  }

  & .flex-box {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }
`;

export const SideBanner = styled.div`
  width: 35%;
  min-height: 100vh;
  background: #002d5c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  position: relative;
  padding-top: 6rem;

  & .fixed {
    width: 100%;
    display: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
  }

  & h1 {
    color: #fff;
    width: 20rem;
    font-size: 2.56rem;
    margin-top: 2.19rem;
    margin-bottom: 1.39rem;
  }

  & ul {
    color: #f1f1f1;
    width: 20rem;
    font-size: 0.96rem;
    & li {
      margin-bottom: 0.853rem;
      line-height: 1.493rem;
    }
  }

  @media (max-width: 876px) {
    display: none;
  }
`;

export const InnerWrapper = styled.div`
  z-index: 10;
  position: relative;

  & img.side-logo {
    z-index: 10;
    height: 2.4rem;
  }
`;

// Menu

export const Lists = styled.ul`
  padding: 0;
  margin: 0;

  &.sub-menu {
    color: #333;
    margin-left: 20px;
    border-left: 1px dashed rgb(255, 255, 255);
    box-sizing: border-box;
    padding-left: 30px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-in;
  }
  &.sub-menu.active {
    max-height: 400px;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  padding: 0.8rem;
`;

export const MenuList = styled.div`
  &.menu-item {
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-size: 15px !important;
    color: red;
    display: block;
    font-weight: 600;
    cursor: pointer;
    padding: 0.8rem;
  }
  &.menu-item.active {
    background: rgb(0, 45, 92);
    border-radius: 5px;
    color: #fff;
  }

  &.menu-item .menu-label {
    display: flex;
    justify-content: space-between;

    & span {
      font-size: 18px !important;
      /* font-size: 18px; */
    }
  }

  &.menu-item .menu-icon {
    display: inline-block;
    width: 40px;
    font-size: 20px;
    text-align: center;
  }
`;

// SideNav
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
  }
   {
  }

  &.main-menu .menu-item {
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-size: 15px;
    display: block;
    font-weight: 600;
    cursor: pointer;
  }
  &.main-menu .menu-item.active {
    background: rgb(3, 100, 255);
    border-radius: 5px;
    color: #fff;
  }
`;

export const Sidemenu = styled.div`
  zoom: 70%;
  @media (max-width: 768px) {
    zoom: 90%;

  }

&.hide{
    left: -300px;
    width: 0;
    padding: 0;

    @media (max-width: 768px) {
    left: 0;
    width: 300px;
    padding: 2rem 1.5rem ;

  }
  
  }
&.side-menu
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  background:rgb(0, 45, 92);
  color: rgb(255, 255, 255);
  width: 300px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2rem 1.5rem ;
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
  justify-content: space-between;
  & h1 {
    color: rgb(51, 51, 51);
    font-size: 20px;
  }
`;

// PageWrapper
export const DashboardPageWrapper = styled.div` 
background: linear-gradient(to bottom right, white 0%, #f6f6fd 50%);
  width: 100%;
  height: calc(100vh - 0.01px);
  overflow-y: hidden;
  padding: 2.2rem;
  /* transition: width 2s, height 4s;
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards; */
  zoom: 85%;

  @media (max-width: 400px) {
    overflow-y: auto;
    padding: 0.8rem;
  }

  & span {
    display: inline-block;
  }

  &.attend-wrapper {
    display: flex;
  }

  &.p-1 {
    padding: 0.2rem;
  }

  @media (max-width: 400px) {
    flex-direction: column;

    & .attend-small {
      flex: 1;
      width: 100% !important;
    }
    &.attend-large {
      flex: 1;
      width: 100%;
    }
  }
`;

// TopMenu
export const TopMenuWrapper = styled.div`
  background: rgba(250, 250, 250, 0.8);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.4rem;
  backdrop-filter: blur(60px);
  webkit-backdrop-filter: blur(60px);
  zoom: 85%;

  & .breadcrumb {
    @media (max-width: 400px) {
      display: none;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  & span,
  & i {
    margin-right: 20px;
  }

  & .profile-item{
    display: flex;
    align-items: center;
  }

  @media (max-width: 400px) {
    & .location-selector{
      width:240px;
    }

    & span {
      display:none;
    }
  

`;

/* Global */
export const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  grid-gap: 2rem;
  margin-top: 3.2rem;
  overflow-y: auto;
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  &.subgrid {
    margin-top: 1rem;
  }

  &.top {
    align-items: start;
  }

  &.two-columns {
    grid-template-columns: repeat(2, 1fr);
  }

  &.four-columns {
    grid-template-columns: repeat(4, 1fr);
  }

  &.five-columns {
    grid-template-columns: 2fr 1fr 0.5fr 0.8fr 0.1fr;

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  & label {
    display: block;
    font-size: 16px;
    font-weight: regular;
    color: #03045e;
    margin-bottom: 0.5rem;
  }
  & p {
    background: #fff;
    padding: 0 0.4rem;
    line-height: 50px;
    height: 50px;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    font-weight: bold;
    font-size: 16px;
    color: #03045e;
    overflow: hidden;
  }
`;

export const LocationCardWrapper = styled.div`
  margin: 10px 0;
  border: 0.6px solid #ebebeb;
  background: #fafafa;
  padding: 16px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

export const LocationWrapper = styled.div`
  width: 240px;
  margin-right: 10px;
  position: relative;
  z-index: 1000;

  @media (max-width: 400px) {
    width: 400px !important;
  }
  & button {
    @media (max-width: 400px) {
      width: 200px !important;
    }
  }
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
    width: 150px;
    height: 150px;
    border-radius: 150px;
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

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

export const SingleBox = styled.div`
  width: 8px;
  height: 12px;
  background-color: #e4eaf0;
  border-radius: 8px;
  margin-bottom: 4px;

  &.cancelled {
    background: #ed0423;
  }
  &.confirmed {
    background: #34d1bf;
  }
  &.attended {
    background: #0496ff;
  }
  &.absent {
    background: #6665dd;
  }
  &.rescheduled {
    background: #f17105;
  }
`;

export const StartCardWapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

// Status Batch
export const StatusBatchWrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: medium;
  margin-right: 32px;

  & span.batch {
    width: 14px;
    height: 14px;
    border-radius: 14px;
    margin-right: 6px;

    &.cancelled {
      border: 3px solid #ed0423;
    }
    &.confirmed {
      border: 3px solid #34d1bf;
    }
    &.attended {
      border: 3px solid #0496ff;
    }
    &.absent {
      border: 3px solid #6665dd;
    }
    &.rescheduled {
      border: 3px solid #f17105;
    }
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  height: 65vh;
  overflow-y: auto;

  @media (max-width: 400px) {
    height: auto;
    overflow-y: auto;
    flex-direction: column;
  }
`;

export const DashboardBox = styled.div`
  padding: 16px;
  padding-top: 0;
  background: #f8f8f8;
  border-radius: 8px;
  margin: 12px 20px 10px 0;
  width: 33%;
  height: 100%;
  overflow-y: auto;
  positions: relative;
  &.lg {
    width: 66%;
    background: white;
    padding: 0;

    .container {
      background: #f8f8f8;
      padding: 10px;
      margin-bottom: 16px;
      border-radius: 8px;
    }
    @media (max-width: 400px) {
      width: 100%;
    }
  }
  & header {
    position: sticky;
    top: 0;
    background: #f8f8f8;
    z-index: 10;
    padding: 10px;

    .top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0 32px;
    }
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const TableMenu = styled.div`
  width: 100%;
  height: 60px;
  margin: 0rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .inner-table {
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

export const PageHeaderMenu = styled.div`
  width: 100%;
  height: 60px;
  margin: 0rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .inner-page-header {
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
