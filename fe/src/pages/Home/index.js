import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  Header,
  ListContainer,
  InputSearchContainer,
} from './styles';

import { icons } from '../../assets/images/icons';

function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
      <Header>
        <strong>3 contatos</strong>

        <Link to="/new">Novo Contato</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span> <img src={icons.arrow} alt="" srcSet="" />
          </button>
        </header>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Higor Matheus</strong>
              <small>Instagram</small>
            </div>
            <span>higormatheus@dev.com</span>
            <span>(11) 99999-9999</span>
          </div>
          <div className="actions">
            <Link to="/edit/123">
              <img src={icons.edit} alt="" />
            </Link>
            <button type="button">
              <img src={icons.trash} alt="" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}

export default Home;
