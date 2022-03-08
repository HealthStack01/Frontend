import styled from 'styled-components';

import AccordionBox from '../accordion';

export const PageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: hidden;
  padding: 0.6rem 1rem;
  /* zoom: 85%; */

  & span {
    display: inline-block;
  }

  &.attend-wrapper {
    display: flex;
  }

  &.p-1 {
    padding: 0.2rem;
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  & div span {
    margin-top: 1rem;
    font-size: 0.8rem;
  }
`;

export const DetailsWrapper = styled(AccordionBox)`
  width: 100%;
  background: ${({ theme }) => theme.neutralwhite};
  padding: 2rem;
  border-radius: 4px;
  margin-top: 2rem;

  & h2 {
    font-size: 1.2rem;
    font-weight: bolder;
    padding: 1.2rem 0 2.4rem;
  }
  & span {
    font-weight: bold;
    cursor: pointer;
  }
`;

export const FullDetailsWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.neutralwhite};
  padding: 0.55rem;
  border-radius: 4px;
  margin-top: 1rem;
  transition: all 0.4s ease-in-out;
  overflow-y: scroll;

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

export const GrayWrapper = styled.div`
  background: ${({ theme }) => theme.grayFour};
  border-radius: 4px;
  height: 100%;
  padding: 1rem;
  /* padding-bottom: 30rem; */
  overflow-y: scroll;

  &.grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`;

export const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  grid-gap: 2rem;
  margin-top: 3.2rem;
  overflow-y: auto;

  &.subgrid {
    margin-top: 1rem;
  }

  &.two-columns {
    grid-template-columns: repeat(2, 1fr);
  }

  &.four-columns {
    grid-template-columns: repeat(4, 1fr);
  }

  & label {
    display: block;
    font-size: 16px;
    font-weight: regular;
    color: #03045e;
    margin-bottom: 0.5rem;
  }
  & p {
    background: ${({ theme }) => theme.grayFour};
    padding: 0.9rem;
    height: 50px;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    font-weight: bold;
    font-size: 16px;
    color: #03045e;
  }
`;

export const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  margin-top: 2rem;
  & button {
    margin-left: 1rem;
  }
`;
