import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import { addToast } from '../../utils/toast';

export const useNewContact = () => {
  const contactFormRef = useRef(null);
  const handleSubmit = async (contact) => {
    try {
      await ContactsService.createContact(contact);
      contactFormRef.current.resetFields();
      addToast({
        type: 'success',
        text: 'Contato cadastrado com sucesso',
      });
    } catch (error) {
      addToast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato',
      });
    }
  };
  return { contactFormRef, handleSubmit };
};
