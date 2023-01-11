import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.gray['200']};
    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
