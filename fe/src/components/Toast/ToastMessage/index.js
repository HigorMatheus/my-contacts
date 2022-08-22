import PropTypes from 'prop-types';
import { icons } from '../../../assets/images';
import { Container } from './styles';

export function ToastMessage({ text, type }) {
  return (
    <Container type={type}>
      {type === 'danger' && <img src={icons.xCircle} alt="x" />}
      {type === 'success' && <img src={icons.checkCircle} alt="check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
