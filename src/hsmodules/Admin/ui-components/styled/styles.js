import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  
`;

export const AuthContainer = styled.div`
  width: 65%;
  height: 100vh;
  padding-top: 12%;
  padding-bottom: 4%;
  background: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  overflow: auto;
  text-align: center;
  @media (max-width: 876px) {
    width: 100%;
  }

  & .aside-container {
    height: calc(100vh - 16%);
    padding: 0 1rem;
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
