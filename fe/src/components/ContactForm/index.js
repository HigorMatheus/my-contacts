import PropTypes from 'prop-types';
import { useState } from 'react';
import isEmailValid from '../../utils/isEmailValid';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [erros, setErros] = useState([]);
  const handleNameChange = (event) => {
    setName(event.target.value);
    if (!event.target.value) {
      setErros((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é Obrigatório' },
      ]);
    } else {
      setErros((prevState) =>
        prevState.filter((error) => error.field !== 'name'),
      );
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadyExists = erros.find((error) => error.field === 'email');
      if (errorAlreadyExists) {
        return;
      }
      setErros((prevState) => [
        ...prevState,
        { field: 'email', message: 'Email invalido' },
      ]);
    } else {
      setErros((prevState) =>
        prevState.filter((error) => error.field !== 'email'),
      );
    }
  };

  const getErrorMessageByFieldName = (fieldName) => {
    return erros.find((error) => error.field === fieldName)?.message;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Select
          placeholder="Select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Categoria</option>
          <option value="Instagram">Instagram</option>
          <option value="discord">discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default ContactForm;
