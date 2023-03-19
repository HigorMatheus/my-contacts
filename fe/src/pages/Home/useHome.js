import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useDeferredValue,
} from 'react';
import ContactsService from '../../services/ContactsService';
import { addToast } from '../../utils/toast';

export const useHome = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderby] = useState('asc');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
    );
  }, [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(
    async (signal) => {
      try {
        setIsLoading(true);
        const contactsList = await ContactsService.listContacts(
          orderBy,
          signal,
        );

        setContacts(contactsList);
        setIsLoading(false);
        setHasError(false);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setHasError(true);
        setContacts([]);
      } finally {
        setIsLoading(false);
      }
    },
    [orderBy],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderby((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleChangeSearchTerm = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleTryAgain = useCallback(() => {
    loadContacts();
  }, [loadContacts]);

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
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
