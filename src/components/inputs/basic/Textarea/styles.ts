import styled from 'styled-components';

export const TextareaField = styled.textarea`
  padding: 0.9rem;
  width: 100%;
  height: 120px;
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.grayTwo};
  width: 100%;
`;
