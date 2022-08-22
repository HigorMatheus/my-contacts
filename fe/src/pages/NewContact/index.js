import ContactsService from '../../services/ContactsService';

import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';
import { addToast } from '../../utils/toast';

function NewContact() {
  const handleSubmit = async ({ name, email, phone, categoryId }) => {
    try {
      const contact = {
        name,
        email,
        phone,
        category_id: categoryId,
      };

      await ContactsService.createContact(contact);
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
      <ContactForm buttonLabel="Cadastra " onSubmit={handleSubmit} />
    </>
  );
}

export default NewContact;
