import styled from "styled-components";

export const SideBanner = styled.div`
  width: 35%;
  height: 100vh;
  background: #1a7431; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  position: relative;
  padding-top: 3rem;

  & .fixed {
    width: 100%;
    display: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
  }

  & h1 {
    color: ${({theme}) => theme.btnText};
    width: 20rem;
    font-size: 2rem;
    margin-top: 2.19rem;
    margin-bottom: 1.39rem;
  }

  & ul {
    color: ${({theme}) => theme.btnText};
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
