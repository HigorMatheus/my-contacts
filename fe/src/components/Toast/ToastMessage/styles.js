import styled, { css } from 'styled-components';

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div`
  padding: 16px 32px;

  color: #fff;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 8px;
  }
  & + & {
    margin-top: 12px;
  }
  ${({ type }) => containerVariants[type] || containerVariants.default}
`;
