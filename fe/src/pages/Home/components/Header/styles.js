import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray['100']};
  margin-top: 32px;
  strong {
    color: ${({ theme }) => theme.colors.gray[900]};
    font-size: 24px;
  }
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    padding: 8px 16px;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      transition: all 0.2s ease-in;

      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;
