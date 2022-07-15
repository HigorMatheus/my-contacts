import React from 'react';
import { icons } from '../../assets/images/icons';

import { Container, Header, ListContainer, Card } from './styles';

export function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 contatos</strong>

        <a href="/#">Novo Contato</a>
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
            <a href="/#">
              <img src={icons.edit} alt="" />
            </a>
            <button type="button">
              <img src={icons.trash} alt="" />
            </button>
          </div>
        </Card>
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
            <a href="/#">
              <img src={icons.edit} alt="" />
            </a>
            <button type="button">
              <img src={icons.trash} alt="" />
            </button>
          </div>
        </Card>{' '}
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
            <a href="/#">
              <img src={icons.edit} alt="" />
            </a>
            <button type="button">
              <img src={icons.trash} alt="" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
