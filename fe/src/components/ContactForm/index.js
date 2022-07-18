import PropTypes from 'prop-types';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';

function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input name="nome" placeholder="Nome" />
      </FormGroup>
      <FormGroup error="Digite o email corretamente">
        <Input name="nome" placeholder="E-mail" error />
      </FormGroup>
      <FormGroup>
        <Input name="nome" placeholder="Telefone" />
      </FormGroup>
      <FormGroup>
        <Select name="selecione" placeholder="Select">
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="Button" disabled>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default ContactForm;
