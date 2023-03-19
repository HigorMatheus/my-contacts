import { useEffect, useImperativeHandle, useState } from 'react';

import formatPhone from '../../hooks/formatPhone';
import useErros from '../../hooks/useErros';
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';
import CategoriesService from '../../services/CategoriesService';
import isEmailValid from '../../utils/isEmailValid';

export const useContactForm = ({ onSubmit, ref }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { setError, removeError, getErrorMessageByFieldName, erros } =
    useErros();
  const [categories, seCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = name && erros.length === 0;

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone ?? ''));
        setCategoryId(contact.category.id ?? '');
      },

      resetFields: () => {
        setName('');
        setEmail('');
        setPhone(formatPhone(''));
        setCategoryId('');
      },
    }),
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    controller.abort();
    async function loadCategories() {
      try {
        const listCategories = await CategoriesService.listCategories(
          controller.signal,
        );
        seCategories(listCategories);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
    return () => {
      controller.abort();
    };
  }, [seCategories, setIsLoadingCategories]);
  const handleNameChange = (event) => {
    setName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é Obrigatório' });
    } else {
      removeError('name');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Email invalido' });
    } else {
      removeError('email');
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(formatPhone(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    await onSubmit({ name, email, phone, categoryId });

    setIsSubmitting(false);
  };
  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isSubmitting,
    isLoadingCategories,
    categories,
    categoryId,
    setCategoryId,
    isFormValid,
  };
};
