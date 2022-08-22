import { useState } from 'react';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export function ToastContainer() {
  const [messages] = useState([
    {
      id: Math.random(),
      type: 'default',
      text: 'Default toast',
    },
    {
      id: Math.random(),
      text: 'Error toast',
      type: 'danger',
    },
    {
      id: Math.random(),
      text: 'Success toast',
      type: 'success',
    },
  ]);
  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          text={message.text}
          type={message.type}
        />
      ))}
    </Container>
  );
}
