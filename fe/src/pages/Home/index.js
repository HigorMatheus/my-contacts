import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../assets/images';
import { icons } from '../../assets/images/icons';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import ContactsService from '../../services/ContactsService';
import { addToast } from '../../utils/toast';
import {
  Card,
  Container,
  EmptyListContainer,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  SearchNotFoundContainer,
} from './styles';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderby] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);

      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = () => {
    setOrderby((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };
  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleTryAgain = () => {
    loadContacts();
  };

  const handleDeleteContact = (contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  };

  const handleConfirmDeleteContact = async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      addToast({
        type: 'success',
        text: 'contato deletado com sucesso',
      });

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id),
      );
      handleCloseDeleteModal();
    } catch (error) {
      addToast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  };
  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        visible={isDeleteModalVisible}
        danger
        title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
        confirmLabel="Deletar"
        isLoading={isLoadingDelete}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquisar contato..."
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}
      <Header
        justifyContent={
          // eslint-disable-next-line no-nested-ternary
          hasError
            ? 'flex-end'
            : contacts.length > 0
            ? 'space-between'
            : 'center'
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}{' '}
            {filteredContacts.length === 1 ? 'contatos' : 'contato'}
          </strong>
        )}

        <Link to="/new">Novo Contato</Link>
      </Header>
      {hasError && (
        <ErrorContainer>
          <img src={images.sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}
      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={images.emptyBox} alt="emptyBox" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão
                <strong>”Novo contato”</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {!!(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={images.magnifierQuestion} alt="magnifierQuestion" />
              <span>
                Nenhum resultado foi encontrado para
                <strong> ”{searchTerm}”</strong>.
              </span>
            </SearchNotFoundContainer>
          )}
          {filteredContacts.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span> <img src={icons.arrow} alt="" srcSet="" />
              </button>
            </ListHeader>
          )}
          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={icons.edit} alt="" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={icons.trash} alt="" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}

export default Home;
