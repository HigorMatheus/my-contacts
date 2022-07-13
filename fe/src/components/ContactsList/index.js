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
        <Card />
      </ListContainer>
    </Container>
  );
}
