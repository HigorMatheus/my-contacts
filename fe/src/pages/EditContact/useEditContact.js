import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import { addToast } from '../../utils/toast';

export const useEditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  const isMounted = useIsMounted();

  useEffect(() => {
    const controller = new AbortController();
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
          controller.signal,
        );

        if (isMounted()) {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        if (isMounted()) {
          safeAsyncAction(() => {
            navigate('/', { replace: true });
            addToast({
              type: 'danger',
              text: 'Contato Nào Encontrado',
            });
          });
        }
      }
    }
    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, isMounted, navigate, safeAsyncAction]);

  const handleSubmit = async ({ name, email, phone, categoryId }) => {
    try {
      const contact = {
        id,
        name,
        email,
        phone,
        category_id: categoryId,
      };

      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);
      addToast({
        type: 'success',
        text: 'Contato Editado com sucesso',
      });
    } catch (error) {
      addToast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato',
      });
    }
  };
  return {
    isLoading,
    handleSubmit,
    contactName,
    contactFormRef,
  };
};
