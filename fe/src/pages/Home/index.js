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
  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !!(!hasContacts && !isLoading);
  const isSearchEmpty =
    !hasError && !!(hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}
      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />
      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
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
