import { useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }
    toastEventManager.on('addToast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addToast', handleAddToast);
    };
  });

  const handleRemoveMessage = () => {
    console.log('remove message');
  };
  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          id={message.id}
          text={message.text}
          type={message.type}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
