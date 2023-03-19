import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

export function Spinner({ size = 32 }) {
  return <StyledSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};
