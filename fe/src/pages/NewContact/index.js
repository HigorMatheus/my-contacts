// import { Container } from './styles';

import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';

function NewContact() {
  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm buttonLabel="Cadastra " />
    </>
  );
}

export default NewContact;
