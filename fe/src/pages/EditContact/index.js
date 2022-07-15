// import { Container } from './styles';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

function EditContact() {
  return (
    <>
      <PageHeader title="editar" />
      <ContactForm buttonLabel="Salvar alterações " />
    </>
  );
}

export default EditContact;
