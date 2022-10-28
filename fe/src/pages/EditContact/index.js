import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import { addToast } from '../../utils/toast';

function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
        setContactName(contact.name);
      } catch {
        history.push('/');
        addToast({
          type: 'danger',
          text: 'Contato Nào Encontrado',
        });
      }
    }
    loadContact();
  }, [history, id]);
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
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditContact;
