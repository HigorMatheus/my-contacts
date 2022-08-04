import { useState } from 'react';

export default function useErros() {
  const [erros, setErros] = useState([]);

  const setError = ({ field, message }) => {
    const errorAlreadyExists = erros.find((error) => error.field === field);
    if (errorAlreadyExists) {
      return;
    }
    setErros((prevState) => [...prevState, { field, message }]);
  };
  const removeError = (fieldName) => {
    setErros((prevState) =>
      prevState.filter((error) => error.field !== fieldName),
    );
  };
  const getErrorMessageByFieldName = (fieldName) => {
    return erros.find((error) => error.field === fieldName)?.message;
  };
  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
    erros,
  };
}
