import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useIsMounted } from '../../hooks/useIsMounted';
import ContactsService from '../../services/ContactsService';
import { addToast } from '../../utils/toast';

export const useEditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        if (isMounted()) {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        }
      } catch {
        if (isMounted()) {
          history.push('/');
          addToast({
            type: 'danger',
            text: 'Contato Nào Encontrado',
          });
        }
      }
    }
    loadContact();
  }, [history, id, isMounted]);
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
