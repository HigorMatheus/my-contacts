import { useCallback, useEffect, useMemo, useState } from 'react';
import ContactsService from '../../services/ContactsService';
import { addToast } from '../../utils/toast';

export const useHome = () => {
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
  return {
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
  };
};
