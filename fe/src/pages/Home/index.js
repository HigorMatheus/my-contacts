import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import { ContactsList } from './components/ContactsList';
import { EmptyList } from './components/EmptyList';
import { ErrorStatus } from './components/ErrorStatus';
import { Header } from './components/Header';
import { InputSearch } from './components/InputSearch';
import { SearchNotFound } from './components/SearchNotFound';

import { Container } from './styles';
import { useHome } from './useHome';

function Home() {
  const {
    filteredContacts,
    hasError,
    isDeleteModalVisible,
    isLoading,
    isLoadingDelete,
    contacts,
    searchTerm,
    contactBeingDeleted,
    orderBy,
    handleChangeSearchTerm,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleDeleteContact,
    handleToggleOrderBy,
    handleTryAgain,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}
      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />
      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && <EmptyList />}

          {!!(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFound searchTerm={searchTerm} />
          )}
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />
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
        </>
      )}
    </Container>
  );
}

export default Home;
