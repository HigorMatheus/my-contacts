import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  Header,
  ListHeader,
  InputSearchContainer,
} from './styles';
import Loader from '../../components/Loader';
import { icons } from '../../assets/images/icons';
import ContactsService from '../../services/ContactsService';
import ApiError from '../../errors/ApiError';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderby] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);
        const contactsList = await ContactsService.listContacts();

        setContacts(contactsList);
      } catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
          console.log('erro de api');
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadContacts();
  }, [orderBy]);

  const handleToggleOrderBy = () => {
    setOrderby((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };
  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquisar contato..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'contatos' : 'contato'}
        </strong>

        <Link to="/new">Novo Contato</Link>
      </Header>
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
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={icons.edit} alt="" />
            </Link>
            <button type="button">
              <img src={icons.trash} alt="" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}

export default Home;
