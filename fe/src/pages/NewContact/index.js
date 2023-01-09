import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import { addToast } from '../../utils/toast';

function NewContact() {
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
  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastra"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
