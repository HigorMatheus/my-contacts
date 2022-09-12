import PropTypes from 'prop-types';
import { icons } from '../../../assets/images';
import { Container } from './styles';

export function ToastMessage({ id, text, type, onRemoveMessage }) {
  const handleRemoveToast = () => {
    onRemoveMessage(id);
  };
  return (
    <Container type={type} onClick={handleRemoveToast}>
      {type === 'danger' && <img src={icons.xCircle} alt="x" />}
      {type === 'success' && <img src={icons.checkCircle} alt="check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
  onRemoveMessage: PropTypes.func.isRequired,
};

ToastMessage.defaultProps = {
  type: 'default',
};
