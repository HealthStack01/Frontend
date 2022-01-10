import styled from 'styled-components';

export const InputField = styled.input`
  padding: 0.9rem;
  height: 50px;
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.grayTwo};
  width: 100%;
`;
