import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { icons } from '../../../assets/images';
import { Container } from './styles';

export function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);
  const handleRemoveToast = useCallback(() => {
    onRemoveMessage(message.id);
  }, [message.id, onRemoveMessage]);
  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={icons.xCircle} alt="x" />}
      {message.type === 'success' && (
        <img src={icons.checkCircle} alt="check" />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  animatedRef: PropTypes.shape().isRequired,
  isLeaving: PropTypes.bool.isRequired,
};
