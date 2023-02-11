import { useEffect } from 'react';
import { useAnimatedList } from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export function ToastContainer() {
  const {
    renderList,
    setItems: setMessages,
    handleRemoveItem,
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ]);
    }
    toastEventManager.on('addToast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addToast', handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
